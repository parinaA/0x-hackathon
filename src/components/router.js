import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import OrderBook from './orderBook';

export const history = createHistory();

export default class Routers extends React.Component {
        render() {
            return (
                <Router history={history}>
                <Switch>
                <Route path='/' component={OrderBook} exact='true'/>
                <Route component={<p>default</p>} />
                </Switch>
                </Router>
            );
        }
}