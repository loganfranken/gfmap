import React from 'react';

export default ({ businesses }) => <ul id="list">
    {businesses.map(({ name }) => <li>{name}</li>)}
</ul>