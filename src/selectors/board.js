import { createSelector } from 'reselect';

const allLanesSelector = state => state.board.lanes;
const allCellsSelector = state => state.board.cells;

const lanesSelector = createSelector(
  allLanesSelector,
  lanes => lanes.byId.map(laneId => lanes[laneId])
);

export const boardSelector = createSelector(
  lanesSelector,
  allCellsSelector,
  (lanes, cells) =>
    lanes.map(lane => ({
      ...lane,
      cells: lane.cells.map(cellId => cells[cellId])
    }))
);
