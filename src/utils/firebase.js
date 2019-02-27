import firebase from 'firebase/app';
import 'firebase/firestore';

let boardRef;

const getBoardRef = () => {
  if (!boardRef) {
    initialize();
  }
  return boardRef;
};

const initialize = config => {
  firebase.initializeApp(config);
  const db = firebase.firestore();
  boardRef = db.collection('boards');
};

const listenToBoard = (board, onAddCallback) => {
  return getBoardRef()
    .doc(board)
    .collection('actions')
    .orderBy('createdAt', 'asc')
    .onSnapshot(doc => {
      doc
        .docChanges()
        .filter(({ type }) => type === 'added')
        .forEach(({ doc }) => {
          onAddCallback(doc.data());
        });
    });
};

const addAction = (board, action) => {
  const createdAt = new firebase.firestore.Timestamp.now();
  getBoardRef()
    .doc(board)
    .collection('actions')
    .add({
      ...action,
      createdAt
    });
};

export { initialize, listenToBoard, addAction };
