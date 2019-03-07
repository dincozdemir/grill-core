import { IFirebaseConfig } from '.';

export interface IConfig {
  boardName: string;
  firebaseConfig?: IFirebaseConfig;
}
