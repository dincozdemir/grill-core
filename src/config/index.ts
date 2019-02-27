import * as firebase from '../utils/firebase';

const initialize = ({ firebaseConfig }) => {
  firebase.initialize(firebaseConfig);
};

export default initialize;
