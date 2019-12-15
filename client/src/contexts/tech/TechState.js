import React, { useReducer } from 'react';

import techReducer from './techReducer';
import techContext from './techContext';

import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_CURRENT_TECH,
  CLEAR_CURRENT_TECH,
  UPDATE_TECH,
  TECHS_ERROR
} from '../types';

const TechState = props => {
  const initialState = {
    techs: [],
    current: null,
    error: null
  };

  const [state, dispatch] = useReducer(techReducer, initialState);

  const { techs, current, error } = state;

  // Get Techs
  const getTechs = async () => {
    const res = await fetch('/api/v1/techs');
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: TECHS_ERROR,
        payload: error
      });
    }

    dispatch({
      type: GET_TECHS,
      payload: data.data
    });
  };

  // Add Tech
  const addTech = async tech => {
    const res = await fetch('/api/v1/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: TECHS_ERROR,
        payload: error
      });
    }

    dispatch({
      type: ADD_TECH,
      payload: data.data
    });
  };

  // Delete Tech
  const deleteTech = async id => {
    const res = await fetch(`/api/v1/techs/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: TECHS_ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  };

  // Update Tech
  const updateTech = async tech => {
    const res = await fetch(`/api/v1/techs/${tech._id}`, {
      method: 'PUT',
      body: JSON.stringify(tech),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: TECHS_ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: UPDATE_TECH,
      payload: data.data
    });

    clearCurrentTech();
  };

  // Set current tech
  const setCurrentTech = tech => {
    dispatch({
      type: SET_CURRENT_TECH,
      payload: tech
    });
  };

  // Clear current tech
  const clearCurrentTech = () => {
    dispatch({
      type: CLEAR_CURRENT_TECH
    });
  };

  return (
    <techContext.Provider
      value={{
        techs,
        current,
        error,
        getTechs,
        addTech,
        deleteTech,
        setCurrentTech,
        updateTech
      }}
    >
      {props.children}
    </techContext.Provider>
  );
};

export default TechState;
