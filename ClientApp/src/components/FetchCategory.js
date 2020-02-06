import React, { Component } from 'react';

export class FetchCategory extends Component {
    static displayName = FetchCategory.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th><a href="/">Title</a></th>
                        <th>Description</th>
                        <th>Closed</th>
                        <th>Link</th>
                        <th><a href="/fetch-category">Category</a></th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.id}>
                            <td><a href={"./Event/" + forecast.id}>{forecast.title}</a></td>
                            <td>{forecast.description}</td>
                            <td>{forecast.closed == "0001-01-01T00:00:00" ? 'Open' : 'Closed'}</td>
                            <td><a href={forecast.link}>{forecast.link}</a></td>
                            {forecast.categories.map(
                                category =>
                                    <td>{category.title}</td>
                            )}
                            {forecast.sources.map(source =>
                                <tr key={source.id}>
                                    <td><p>{source.id}</p><a href={source.url}>Source Link</a></td>
                                </tr>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchCategory.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1 id="tabelLabel" >Recent Natural Events</h1>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('category');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
