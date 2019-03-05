import { initialize as initStore } from '../store';
import { IFirebaseConfig } from '../../types/IFirebaseConfig';

interface Config {
  boardName: string;
  firebaseConfig: IFirebaseConfig;
}

const initialize = (config: Config) => {
  initStore(config.firebaseConfig);
};

export default initialize;
