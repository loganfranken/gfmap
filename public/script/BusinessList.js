import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    list-style: none;
`
export default ({ businesses }) => <List>
    {businesses.map(({ id, name, url }) => <li key={id}><a href={url}>{name}</a></li>)}
</List>