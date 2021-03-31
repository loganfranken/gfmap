import React from 'react';

export default class extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {query: ''};
    }

    handleChange = (event) => {
        this.props.onQueryChange(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit();
    }

    render()
    {
        return (
            <form class="location-search-control" onSubmit={this.handleSubmit}>
                <label for="location-search-text">Location</label>
                <input type="text" id="location-search-text" value={this.props.query} onChange={this.handleChange}></input>
                <button>Search</button>
            </form>
        )
    }
}