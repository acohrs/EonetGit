import React, { Component } from 'react';


export class FetchEvent extends Component {
    static displayName = FetchEvent.name;

    constructor(props) {
        super(props);
        this.state = { event: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderEventTable(event) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th><a href="/">Title</a></th>
                        <th>Description</th>
                        <th>Link</th>
                        <th><a href="/fetch-category">Category</a></th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>{event.description}</td>
                            <td><a href={event.link}>{event.link}</a></td>
                            {event.categories.map(
                                category =>
                                    <tr key={category.id}>
                                        <td>{category.title}</td>
                                    </tr>
                            )}
                        </tr>
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchEvent.renderEventTable(this.state.event);


        return (
            <div>
                <h1 id="tabelLabel" >Event</h1>
                <div class="">
                    <a href="/">Back</a>
                </div>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        let urlParam = this.props.location.pathname.split('/')[2];
        let body = JSON.stringify({
            "id": urlParam
        });
        const response = await fetch('event', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: body
        });
        const data = await response.json();
        this.setState({ event: data, loading: false });
    }
}
