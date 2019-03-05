import { IBoardStore } from '../../types';

export class LocalDb implements IBoardStore {
  onAddCallback = (action: any) => {};

  initialize = () => {};

  listenToBoard = (board: any, onAddCallback: any) => {
    this.onAddCallback = onAddCallback;
    return () => {};
  };

  addAction = (board: any, action: any) => {
    this.onAddCallback(action);
  };
}
