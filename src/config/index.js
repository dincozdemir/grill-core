import store from '../store';

const initialize = ({ firebaseConfig }) => {
  store.initialize(firebaseConfig);
};

export default initialize;
