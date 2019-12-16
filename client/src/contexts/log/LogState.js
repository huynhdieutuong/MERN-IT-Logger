import React, { useReducer } from 'react';

import logContext from './logContext';
import logReducer from './logReducer';

import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT_LOG,
  CLEAR_CURRENT_LOG,
  UPDATE_LOG,
  SET_LOADING,
  SEARCH_LOGS,
  LOGS_ERROR,
  CLEAR_SEARCH
} from '../types';

const LogState = props => {
  const initialState = {
    logs: [],
    current: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  const { logs, current, loading, error } = state;

  // Get Logs
  const getLogs = async () => {
    setLoading();

    const res = await fetch('/api/v1/logs');
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: LOGS_ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: GET_LOGS,
      payload: data.data
    });
  };

  // Add Log
  const addLog = async log => {
    const res = await fetch('/api/v1/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: LOGS_ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: ADD_LOG,
      payload: data.data
    });
  };

  // Delete Log
  const deleteLog = async id => {
    const res = await fetch(`/api/v1/logs/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: LOGS_ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  };

  // Update Log
  const updateLog = async log => {
    const res = await fetch(`/api/v1/logs/${log._id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: LOGS_ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: UPDATE_LOG,
      payload: data.data
    });

    clearCurrentLog();
  };

  // Search Logs
  const searchLogs = async text => {
    const res = await fetch(`/api/v1/logs/search?q=${text}`);
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: LOGS_ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: SEARCH_LOGS,
      payload: data.data
    });
  };

  // Clear Search
  const clearSearch = async () => {
    const res = await fetch('/api/v1/logs');
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: LOGS_ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: CLEAR_SEARCH,
      payload: data.data
    });
  };

  // Set Current Log
  const setCurrentLog = log => {
    dispatch({
      type: SET_CURRENT_LOG,
      payload: log
    });
  };

  // Clear Current Log
  const clearCurrentLog = () => {
    dispatch({
      type: CLEAR_CURRENT_LOG
    });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <logContext.Provider
      value={{
        logs,
        current,
        loading,
        error,
        getLogs,
        addLog,
        deleteLog,
        setCurrentLog,
        updateLog,
        searchLogs,
        clearSearch
      }}
    >
      {props.children}
    </logContext.Provider>
  );
};

export default LogState;
