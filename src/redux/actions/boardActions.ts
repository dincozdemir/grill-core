import { v1 as uuid } from 'uuid';

import {
  ADD_CELL,
  REMOVE_CELL,
  ADD_LANE,
  EDIT_CELL_START,
  EDIT_CELL_END,
  REMOVE_LANE
} from '../types';

import { db } from '../../store';

let listener: any;

export const listenToBoard = () => (dispatch: any) => {
  listener = db.listenToBoard(onBoardChange(dispatch));
};

export const unListenToBoard = () => {
  listener && listener();
};

const onBoardChange = (dispatch: any) => (action: any) => {
  dispatch(action);
};

export const addLane = (lane: any) => () => {
  const id = uuid();
  db.addAction({
    type: ADD_LANE,
    payload: {
      lane: { ...lane, id, cells: [] }
    }
  });
};

export const removeLane = ({ laneId }: any) => () => {
  db.addAction({
    type: REMOVE_LANE,
    payload: {
      laneId
    }
  });
};

export const addCell = ({ laneId, cell }: any) => () => {
  db.addAction({
    type: ADD_CELL,
    payload: {
      laneId,
      cell: {
        ...cell,
        id: uuid(),
        content: '',
        votes: 0
      }
    }
  });
};

export const removeCell = ({ laneId, cellId }: any) => () => {
  db.addAction({
    type: REMOVE_CELL,
    payload: {
      laneId,
      cellId
    }
  });
};
export const editCellStart = ({ cellId, userId }: any) => (
  dispatch: any,
  getState: any
) => {
  const { board } = getState();
  if (!board.editingCells[cellId]) {
    db.addAction({
      type: EDIT_CELL_START,
      payload: {
        cellId,
        userId
      }
    });
  }
};

export const editCellEnd = ({ cellId, content }: any) => () => {
  db.addAction({
    type: EDIT_CELL_END,
    payload: {
      cellId,
      content
    }
  });
};
