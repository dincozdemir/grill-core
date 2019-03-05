import * as firebase from 'firebase';
import 'firebase/firestore';
import { IBoardStore, IFirebaseConfig } from '../../types';

export class FirestoreDb implements IBoardStore {
  boardRef: any;

  getBoardRef = () => {
    return this.boardRef;
  };

  initialize = (config: IFirebaseConfig) => {
    firebase.initializeApp(config);
    const db = firebase.firestore();
    this.boardRef = db.collection('boards');
  };

  listenToBoard = (board: string, onAddCallback: any) =>
    this.getBoardRef()
      .doc(board)
      .collection('actions')
      .orderBy('createdAt', 'asc')
      .onSnapshot((doc: any) => {
        doc
          .docChanges()
          .filter(({ type }: any) => type === 'added')
          .forEach(({ doc }: any) => {
            onAddCallback(doc.data());
          });
      });

  addAction = (board: string, action: object) => {
    this.getBoardRef()
      .doc(board)
      .collection('actions')
      .add({
        ...action,
        createdAt: firebase.firestore.Timestamp.now()
      });
  };
}
