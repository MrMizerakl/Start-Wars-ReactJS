import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import configureStore, { history } from './store';
import { initialStore } from './store/initial-store';

import Comparison from './containers/comparison';
import './index.scss';
import 'whatwg-fetch';

const store = configureStore(initialStore);

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Comparison />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
