let onAddCallback;

const initialize = () => {};

const listenToBoard = (board, onAddCallback) => {
  this.onAddCallback = onAddCallback;
  return () => {};
};

const addAction = (board, action) => {
  onAddCallback(action);
};

export { initialize, listenToBoard, addAction };
