import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router, Route, BrowserRouter}  from 'react-router-dom';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

ReactDOM.render(
        <BrowserRouter>
            <Router history={history}>
                <Route path='/' component={App} />
            </Router>
        </BrowserRouter>,
document.getElementById('root'));
