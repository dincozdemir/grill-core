import uuid from 'uuid/v1';

import { ADD_CELL, ADD_LANE, EDIT_CELL_START, EDIT_CELL_END } from '../types';

import { db } from '../../store';

let listener: any;

export const listenToBoard = () => (dispatch: any, getState: any) => {
  const { board } = getState();
  listener = db.listenToBoard(board.name, onBoardChange(dispatch));
};

export const unListenToBoard = () => {
  listener && listener();
};

const onBoardChange = (dispatch: any) => (action: any) => {
  dispatch(action);
};

export const addLane = ({ laneName }: any) => (
  dispatch: any,
  getState: any
) => {
  const { board } = getState();
  const id = uuid();
  db.addAction(board.name, {
    type: ADD_LANE,
    payload: {
      lane: { id, name: laneName, cells: [] }
    }
  });
};

export const addCell = ({ laneId }: any) => (dispatch: any, getState: any) => {
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

export const editCellStart = ({ cellId, userId }: any) => (
  dispatch: any,
  getState: any
) => {
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

export const editCellEnd = ({ cellId, content }: any) => (
  dispatch: any,
  getState: any
) => {
  const { board } = getState();
  db.addAction(board.name, {
    type: EDIT_CELL_END,
    payload: {
      cellId,
      content
    }
  });
};
