import * as firebase from 'firebase';
import 'firebase/firestore';
import { IBoardStore, IConfig } from '../../types';

export class FirestoreDb implements IBoardStore {
  actionsRef: any;

  getActionsRef = () => {
    return this.actionsRef;
  };

  initialize = (config: IConfig) => {
    firebase.initializeApp(config.firebaseConfig);
    const db = firebase.firestore();
    this.actionsRef = db
      .collection('boards')
      .doc(config.boardName)
      .collection('actions');
  };

  listenToBoard = (onAddCallback: any) =>
    this.getActionsRef()
      .orderBy('createdAt', 'asc')
      .onSnapshot((doc: any) => {
        doc
          .docChanges()
          .filter(({ type }: any) => type === 'added')
          .forEach(({ doc }: any) => {
            onAddCallback(doc.data());
          });
      });

  addAction = (action: object) => {
    this.getActionsRef().add({
      ...action,
      createdAt: firebase.firestore.Timestamp.now()
    });
  };
}
