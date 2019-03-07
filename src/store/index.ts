import { FirestoreDb } from './firestore';
import { LocalDb } from './local';
import { IConfig, IBoardStore } from '../../types';

let firestoreDb: FirestoreDb;
let localDb: LocalDb;

let db: IBoardStore;

function initialize(config: IConfig) {
  if (config.firebaseConfig) {
    firestoreDb = new FirestoreDb();
    firestoreDb.initialize(config);
    db = firestoreDb;
  } else {
    localDb = new LocalDb();
    db = localDb;
  }
}

export { initialize, db };
