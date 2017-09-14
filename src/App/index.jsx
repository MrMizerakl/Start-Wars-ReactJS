import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
        <BrowserRouter>
          <Comparison />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
