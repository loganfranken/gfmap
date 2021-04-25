import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
    background: #C73F12;
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    padding: 1em;
`

const Input = styled.input`
    background: none;
    border: 1px solid #FFF;
    border-width: 0 0 2px 0;
    color: #FFF;
    flex-grow: 1;
    margin-right: 10px;
    outline: none;
    max-width: 25em;
`

const Button = styled.button`
    background: none;
    background-image: url(../images/magnifying_glass.svg);
    background-position: center center;
    background-repeat: no-repeat;
    border: 0;
    color: #FFF;
    font-weight: bold;
    padding: 0.5em;
    text-indent: -9999em;
    width: 1.5em;
`

export default ({ query, onSubmit, onQueryChange }) => <Form onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
    <Input type="text" id="location-search-text" aria-label="Search Location" value={query} onChange={(event) => { onQueryChange(event.target.value); }} />
    <Button>Search</Button>
</Form>