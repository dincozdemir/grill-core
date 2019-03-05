import { createSelector } from 'reselect';

const allLanesSelector = (state: any) => state.board.lanes;
const allCellsSelector = (state: any) => state.board.cells;

const lanesSelector = createSelector(
  allLanesSelector,
  lanes => lanes.byId.map((laneId: string) => lanes[laneId])
);

export const boardSelector = createSelector(
  lanesSelector,
  allCellsSelector,
  (lanes, cells) =>
    lanes.map((lane: any) => ({
      ...lane,
      cells: lane.cells.map((cellId: string) => cells[cellId])
    }))
);
