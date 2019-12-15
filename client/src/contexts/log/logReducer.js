import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT_LOG,
  CLEAR_CURRENT_LOG,
  UPDATE_LOG,
  SET_LOADING,
  SEARCH_LOGS,
  LOGS_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload]
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload)
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log =>
          log._id === action.payload._id ? action.payload : log
        )
      };
    case SET_CURRENT_LOG:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_LOG:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
