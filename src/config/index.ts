import { initialize as initStore } from '../store';
import { IConfig } from '../../types';

const initialize = (config: IConfig) => {
  initStore(config);
};

export default initialize;
