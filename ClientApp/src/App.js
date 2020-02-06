import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { FetchCategory } from './components/FetchCategory'
import { FetchEvent } from './components/FetchEvent'


import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={FetchData} />
                <Route exact path='/fetch-category' component={FetchCategory} />
                <Route path='/event/:id' component={FetchEvent} />
            </Layout>
        );
    }
}
