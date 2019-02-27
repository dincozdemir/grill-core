import { ADD_CELL, ADD_LANE, EDIT_CELL_START, EDIT_CELL_END } from '../types';

const INITIAL_STATE = {
  name: 'air',
  cells: {
    byId: []
  },
  lanes: {
    byId: []
  },
  editingCells: []
};

const INITIAL_STATE2 = {
  board: {
    name: 'air',
    cells: {
      1: {
        id: 1,
        content: 'Cell1',
        votes: 0
      },
      2: {
        id: 2,
        content: 'Cell2',
        votes: 1
      },
      3: {
        id: 3,
        content: 'Cell3',
        votes: 3
      },
      byId: [1, 2, 3]
    },
    lanes: {
      1: {
        id: 1,
        name: 'Went Well',
        cells: [1, 2]
      },
      2: {
        id: 2,
        name: 'Bad',
        cells: [3]
      },
      byId: [1, 2]
    }
  },
  editingCells: {
    1: 1
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_CELL:
      return addCell(state, payload);
    case ADD_LANE:
      return addLane(state, payload);
    case EDIT_CELL_START:
      return editCellStart(state, payload);
    case EDIT_CELL_END:
      return editCellEnd(state, payload);
    default:
      return state;
  }
};

const addCell = (state, { laneId, cell }) => {
  const cells = {
    ...state.cells,
    [cell.id]: cell,
    byId: [...state.cells.byId, cell.id]
  };
  const lanes = { ...state.lanes };

  lanes[laneId].cells.push(cell.id);
  return { ...state, cells, lanes };
};

const addLane = (state, { lane }) => {
  const lanes = {
    ...state.lanes,
    [lane.id]: lane,
    byId: [...state.lanes.byId, lane.id]
  };
  return { ...state, lanes };
};

const editCellStart = (state, { cellId, userId = 1 /** TODO */ }) => {
  if (state.editingCells[cellId]) {
    return state;
  }
  const { editingCells } = state;
  return {
    ...state,
    editingCells: { ...editingCells, [cellId]: userId }
  };
};

const editCellEnd = (state, { cellId, content }) => {
  const { editingCells, cells } = state;
  const newCells = {
    ...cells,
    [cellId]: {
      ...cells[cellId],
      content
    }
  };
  const { [cellId]: temp, ...newEditingCells } = editingCells;
  const newState = {
    ...state,
    cells: newCells,
    editingCells: newEditingCells
  };
  return newState;
};
