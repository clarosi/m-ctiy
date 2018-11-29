import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import './resources/css/app.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { firebase } from './firebase/firebaseConfig';

// There is only 1 reducer as of now.
const rootReducer = combineReducers({authReducer});

// Setting up redux dev tools.
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose) || compose;

// Create the redux store. Redux-thunk lets you execute async code, this is an alternative to redux-saga.
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// React-redux is use to inject redux to react app.

const Apps = (props) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App {...props} />
            </BrowserRouter>
        </Provider>
    );
};

firebase.auth().onAuthStateChanged((user) => {
    ReactDOM.render(<Apps user={user} />, document.getElementById('root'));
});

