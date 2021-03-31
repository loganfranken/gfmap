import React from 'react';

export default ({ businesses }) => <ul id="list">
    {businesses.map(({ id, name, url }) => <li key={id}><a href={url}>{name}</a></li>)}
</ul>