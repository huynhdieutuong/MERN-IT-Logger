import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_CURRENT_TECH,
  CLEAR_CURRENT_TECH,
  UPDATE_TECH,
  TECHS_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload
      };
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload]
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(tech => tech._id !== action.payload)
      };
    case UPDATE_TECH:
      return {
        ...state,
        techs: state.techs.map(tech =>
          tech._id === action.payload._id ? action.payload : tech
        )
      };
    case SET_CURRENT_TECH:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_TECH:
      return {
        ...state,
        current: null
      };
    case TECHS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
