import * as firestore from './firestore';
import * as local from './local';

let db = local;

const initialize = firebaseConfig => {
  if (firebaseConfig) {
    firestore.initialize(firebaseConfig);
    db = firestore;
  }
};

const getDb = () => db;

export { initialize, getDb };
