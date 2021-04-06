import React from 'react';

export default ({ query, onSubmit, onQueryChange }) => <form class="location-search-control" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
    <label for="location-search-text">Location</label>
    <input type="text" id="location-search-text" value={query} onChange={(event) => { onQueryChange(event.target.value); }}></input>
    <button>Search</button>
</form>