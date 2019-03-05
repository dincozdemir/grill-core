import { FirestoreDb } from './firestore';
import { LocalDb } from './local';
import { IFirebaseConfig, IBoardStore } from '../../types';

let firestoreDb: FirestoreDb;
let localDb: LocalDb;

let db: IBoardStore;

function initialize(firebaseConfig?: IFirebaseConfig) {
  if (firebaseConfig) {
    firestoreDb = new FirestoreDb();
    firestoreDb.initialize(firebaseConfig);
    db = firestoreDb;
  } else {
    localDb = new LocalDb();
    db = localDb;
  }
}

export { initialize, db };
