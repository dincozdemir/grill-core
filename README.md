<p align="left">
  <img src="https://user-images.githubusercontent.com/2143920/53529837-39ed6f00-3aee-11e9-9b69-3e72e4aeb57c.png" width="270" title="hover text">
</p>
Grill is an infrastructure for collaborative dashboards run on a firestore datasource.

## Installation:

`yarn add grill-core`

## Usage

Import reducers as:

```js
import { combineReducers } from 'redux';
import { reducers } from 'grill-core';

export default combineReducers(reducers);
```

Import actions as:

```js
import { actions } from 'grill-core';
const {
  listenToBoard,
  unListenToBoard,
  addLane,
  addCell,
  editCellStart,
  editCellEnd
} = actions;

export {
  listenToBoard,
  unListenToBoard,
  addLane,
  addCell,
  editCellStart,
  editCellEnd
};
```

Import selectors as:

```js
import { selectors } from 'grill-core';
const { boardSelector } = selectors;
export { boardSelector };
```

Grill requires a firebase project with firestore enabled
Configure grill-core as:

```js
import { initialize } from 'grill-core';

initialize({
  boardName: 'XRetro',
  firebaseConfig: {
    apiKey: 'xxxx',
    authDomain: 'xxx.firebaseapp.com',
    databaseURL: 'https://xxx.firebaseio.com',
    projectId: 'xxx',
    storageBucket: 'xxx.appspot.com',
    messagingSenderId: 'abc'
  }
});
```

Use grill-core in your component as:

```js
import { connect } from 'react-redux';
import {
  listenToBoard,
  unListenToBoard,
  addLane,
  addCell,
  editCellStart,
  editCellEnd
} from '../../redux/actions';
import { boardSelector } from '../../selectors';
import Board from './Board';

export default connect(
  state => ({
    board: boardSelector(state)
  }),
  {
    listenToBoard,
    unListenToBoard,
    addLane,
    addCell,
    editCellStart,
    editCellEnd
  }
)(Board);
```

```js
class Board extends React.Component {
  componentDidMount() {
    this.props.listenToBoard();
  }

  componentDidUnMount() {
    this.props.unListenToBoard();
  }
  ...
}
```
