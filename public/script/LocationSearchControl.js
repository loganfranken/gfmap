import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
    background: #C73F12;
    display: flex;
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
`

const Button = styled.button`
    background: none;
    border: 0;
    color: #FFF;
    font-weight: bold;
    padding: 0.5em;
`

export default ({ query, onSubmit, onQueryChange }) => <Form onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
    <Input type="text" id="location-search-text" aria-label="Search Location" value={query} onChange={(event) => { onQueryChange(event.target.value); }} />
    <Button>Search</Button>
</Form>