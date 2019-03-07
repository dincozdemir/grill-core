import { IBoardStore } from '../../types';

export class LocalDb implements IBoardStore {
  onAddCallback = (action: any) => {};

  initialize = () => {};

  listenToBoard = (onAddCallback: any) => {
    this.onAddCallback = onAddCallback;
    return () => {};
  };

  addAction = (action: any) => {
    this.onAddCallback(action);
  };
}
