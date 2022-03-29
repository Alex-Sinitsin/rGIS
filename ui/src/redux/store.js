import {createStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger/src";

import {rootReducers} from "./modules";

const reduxLogger = createLogger();

export const configureStore = (reducers = {}, preloadedState = {}, middlewares = []) => createStore(
    combineReducers({
        ...rootReducers,
        ...reducers
    }),
    preloadedState,
    composeWithDevTools(
       applyMiddleware(
           ...middlewares,
           thunk,
           reduxLogger
       )
    )
);