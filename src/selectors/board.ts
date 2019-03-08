import { createSelector } from 'reselect';

const allLanesSelector = (state: any) => state.board.lanes;
const allCellsSelector = (state: any) => state.board.cells;
const editingCellsSelector = (state: any) => state.board.editingCells;

const lanesSelector = createSelector(
  allLanesSelector,
  lanes => lanes.byId.map((laneId: string) => lanes[laneId])
);

export const boardSelector = createSelector(
  lanesSelector,
  allCellsSelector,
  editingCellsSelector,
  (lanes, cells, editingCells) =>
    lanes.map((lane: any) => ({
      ...lane,
      cells: lane.cells.map((cellId: string) => ({
        ...cells[cellId],
        editingBy: editingCells[cellId]
      }))
    }))
);
