import React from 'react';
import { Provider } from 'react-redux';
import Comparison from './containers/comparison';
import configureStore from './store';
import {initialStore} from './store/initial-store';
import './index.scss';
import 'whatwg-fetch';

const store = configureStore( initialStore );

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Comparison />
      </Provider>
    );
  }
}

export default App;
