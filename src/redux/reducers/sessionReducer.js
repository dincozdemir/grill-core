import { SESSION } from '../types';

const INITIAL_STATE = {
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION.LOGIN:
      return { ...state, user: action.payload };
    case SESSION.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
