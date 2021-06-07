import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import CounterContainer from './containers/Counter';
import { counterApp } from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(counterApp);

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* Ejemplo Redux */}
    <Provider store={store}>
      <CounterContainer />
    </Provider>
    {/* Ejemplo Redux */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
