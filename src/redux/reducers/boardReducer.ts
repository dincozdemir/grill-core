import {
  ADD_CELL,
  REMOVE_CELL,
  ADD_LANE,
  EDIT_CELL_START,
  EDIT_CELL_END,
  REMOVE_LANE
} from '../types';

interface Action {
  type: string;
  payload: object;
}

const INITIAL_STATE = {
  cells: {},
  lanes: {
    byId: []
  },
  editingCells: {}
};

export default (state = INITIAL_STATE, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CELL:
      return addCell(state, payload);
    case REMOVE_CELL:
      return removeCell(state, payload);
    case ADD_LANE:
      return addLane(state, payload);
    case EDIT_CELL_START:
      return editCellStart(state, payload);
    case EDIT_CELL_END:
      return editCellEnd(state, payload);
    case REMOVE_LANE:
      return removeLane(state, payload);
    default:
      return state;
  }
};

const addCell = (state: any, { laneId, cell }: any) => {
  const cells = {
    ...state.cells,
    [cell.id]: cell
  };
  const lane = {
    ...state.lanes[laneId],
    cells: [...state.lanes[laneId].cells, cell.id]
  };
  const lanes = { ...state.lanes, [laneId]: lane };

  const editingCells = cell.user
    ? { ...state.editingCells, [cell.id]: cell.user.id }
    : state.editingCells;
  return { ...state, cells, lanes, editingCells };
};

const removeCell = (state: any, { laneId, cellId }: any) => {
  // eslint-disable-next-line no-unused-vars
  const { [cellId]: temp, ...cells } = state.cells;
  const lanes = { ...state.lanes };

  var index = lanes[laneId].cells.indexOf(cellId);
  if (index > -1) {
    lanes[laneId].cells.splice(index, 1);
  }

  return { ...state, cells, lanes };
};

const addLane = (state: any, { lane }: any) => {
  const lanes = {
    ...state.lanes,
    [lane.id]: lane,
    byId: [...state.lanes.byId, lane.id]
  };
  return { ...state, lanes };
};

const removeLane = (state: any, { laneId }: any) => {
  // Remove lane from lanes
  // eslint-disable-next-line no-unused-vars
  const { [laneId]: temp, ...lanes } = state.lanes;
  const newLanes = {
    ...lanes,
    byId: state.lanes.byId.filter(id => id !== laneId)
  };
  // Remove cells that were in this lane
  const newCells = Object.keys(state.cells).reduce((result, cellId) => {
    if (!state.lanes[laneId].cells.includes(cellId)) {
      result[cellId] = { ...state.cells[cellId] };
    }
    return result;
  }, {});

  // Remove cells from editingCells
  const newEditingCells = Object.keys(state.editingCells).reduce(
    (result, cellId) => {
      if (newCells[cellId]) {
        result[cellId] = state.editingCells[cellId];
      }
      return result;
    },
    {}
  );

  const newState = {
    ...state,
    lanes: newLanes,
    cells: newCells,
    editingCells: newEditingCells
  };
  return newState;
};

const editCellStart = (state: any, { cellId, userId }: any) => {
  if (state.editingCells[cellId]) {
    return state;
  }
  const { editingCells } = state;
  return {
    ...state,
    editingCells: { ...editingCells, [cellId]: userId }
  };
};

const editCellEnd = (state: any, { cellId, content }: any) => {
  const { editingCells, cells } = state;
  const newCells = {
    ...cells,
    [cellId]: {
      ...cells[cellId],
      content
    }
  };
  // eslint-disable-next-line no-unused-vars
  const { [cellId]: temp, ...newEditingCells } = editingCells;
  const newState = {
    ...state,
    cells: newCells,
    editingCells: newEditingCells
  };
  return newState;
};
