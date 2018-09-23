import {createMuiTheme} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import React from 'react';
import ReactDOM from 'react-dom';
import Provider from "react-redux/src/components/Provider";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import App from './Containers/App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import feedReducer from "./Store/feedReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        feedsData: feedReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);
const theme = createMuiTheme({});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
