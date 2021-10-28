import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"

import { createStore,compose, applyMiddleware,combineReducers} from 'redux';
import { Provider} from 'react-redux';

import thunk from 'redux-thunk';

import OrderReducer from "./store/reducers/order"
import burgerBuilderReducer from "./store/reducers/burgerBuilder"

const rootReducer =  combineReducers({
  order:  OrderReducer,
  burgerBuilder:  burgerBuilderReducer
})



const middleware = store =>{
  return next=>{
    return action=>{
      next(action)
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(middleware,thunk)
  ))

// const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const app = (
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
  
);


ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
