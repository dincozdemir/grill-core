let onAddCallback;

const initialize = config => {
  console.log('Store simulation - Configure board');
};

const listenToBoard = (board, onAddCallback) => {
  this.onAddCallback = onAddCallback;
  console.log('Store simulation - Listening board');
  return () => console.log('Store simulation - Board unlistened');
};

const addAction = (board, action) => {
  console.log(`Store simulation - Add action: ${action.type}`);
  onAddCallback(action);
};

export { initialize, listenToBoard, addAction };
