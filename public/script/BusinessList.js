import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    list-style: none;
    font-size: 1.5em;
    font-weight: bold;
    margin: 1em auto 0;
    max-width: 30em;
    padding: 1em;
`

const ListItem = styled.li`
    margin-bottom: 1.5em;
`

const Link = styled.a`
    color: #000;
    border-bottom: 3px ${props => props?.theme?.backgroundColor} dashed;
    text-decoration: none;
`

export default ({ businesses }) => <List>
    {businesses.map(({ id, name, url }) => <ListItem key={id}><Link href={url}>{name}</Link></ListItem>)}
</List>