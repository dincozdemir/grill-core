import reducer from './sessionReducer';
import { SESSION } from '../types';

describe('sessionReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      user: {}
    });
  });

  it('should set user to store', () => {
    expect(
      reducer({} as any, {
        type: SESSION.LOGIN,
        payload: {
          name: 'dincozdemir'
        }
      })
    ).toEqual({
      user: {
        name: 'dincozdemir'
      }
    });
  });

  it('should remove user from store', () => {
    expect(
      reducer({} as any, {
        type: SESSION.LOGOUT
      })
    ).toEqual({
      user: {}
    });
  });
});
