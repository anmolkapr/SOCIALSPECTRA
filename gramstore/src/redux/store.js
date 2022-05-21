import {createStore, applyMiddleware,combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { usersReducer } from './reducers/userReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './reducers/postsReducer';

const rootReducer = combineReducers({
    usersReducer: usersReducer,
    alertsReducer: alertsReducer,
    postsReducer : postsReducer
})


const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
  });

  const store = configureStore(
    {
      reducer: rootReducer,
    }
  );

  export default store;