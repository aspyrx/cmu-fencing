/**
 * Main app module.
 *
 * @module src/App
 */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import asyncComponent from 'src/async-component';
import Spinner from 'src/Spinner';
import routeConfig, { routeConfigFlat } from 'src/routeConfig';

import NotFound from 'bundle-loader?src/NotFound';
import Header from './Header';
import Footer from './Footer';
import styles from './index.less';

const routes = routeConfigFlat.map((config, i) => {
    const { path, component } = config;
    return <Route
        key={i}
        path={path}
        exact={path === '/'}
        strict
        component={component}
    />;
});

/**
 * React component for the entire app.
 *
 * @returns {ReactElement} The app's elements.
 */
export default function App() {
    return <BrowserRouter basename={__webpack_public_path__}>
        <div>
            <Header routeConfig={routeConfig} />
            <div className={styles.container}>
                <Switch>
                    { routes }
                    <Route component={asyncComponent(NotFound, Spinner)} />
                </Switch>
            </div>
            <Footer routeConfig={routeConfig} />
        </div>
    </BrowserRouter>;
}
