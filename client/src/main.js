import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-modal/lib/styles/rbm-patch.css'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/ClearButton.css';
import './main.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
