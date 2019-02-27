import uuid from 'uuid/v1';

import { ADD_CELL, ADD_LANE, EDIT_CELL_START, EDIT_CELL_END } from '../types';

import { getDb } from '../../store';

const db = getDb();
let listener;

export const listenToBoard = () => (dispatch, getState) => {
  const { board } = getState();
  listener = db.listenToBoard(board.name, onBoardChange(dispatch));
};

export const unListenToBoard = () => {
  listener && this.listener();
};

const onBoardChange = dispatch => action => {
  dispatch(action);
};

export const addLane = ({ laneName }) => (dispatch, getState) => {
  const { board } = getState();
  const id = uuid();
  db.addAction(board.name, {
    type: ADD_LANE,
    payload: {
      lane: { id, name: laneName, cells: [] }
    }
  });
};

export const addCell = ({ laneId }) => (dispatch, getState) => {
  const { board } = getState();
  db.addAction(board.name, {
    type: ADD_CELL,
    payload: {
      laneId,
      cell: {
        id: uuid(),
        content: '',
        votes: 0
      }
    }
  });
};

export const editCellStart = ({ cellId, userId }) => (dispatch, getState) => {
  const { board } = getState();
  if (!board.editingCells[cellId]) {
    db.addAction(board.name, {
      type: EDIT_CELL_START,
      payload: {
        cellId,
        userId
      }
    });
  }
};

export const editCellEnd = ({ cellId, content }) => (dispatch, getState) => {
  const { board } = getState();
  db.addAction(board.name, {
    type: EDIT_CELL_END,
    payload: {
      cellId,
      content
    }
  });
};
