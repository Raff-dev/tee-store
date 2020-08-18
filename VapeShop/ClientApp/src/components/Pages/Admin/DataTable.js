import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import { MDBBtn } from "mdbreact";
import Form from 'react-bootstrap/Form'

import { Resource } from '../../utilities/Resource';

export const DataTable = ({ columns, entries }) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Index</th>
                    {columns.map((column, index) => {
                        return <th key={index}>
                            {FirstToUppercase(column)}
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {entries.map(DataTableRow)}
            </tbody>
        </Table>
    );
}

const DataTableRow = (instance, rowIndex) => {
    const entry = Object.entries(instance);

    return (
        <tr key={rowIndex} >
            <Button variant="primary">
                <Glyphicon glyph="pencil" />
            </Button>
            <Button variant="danger" >
                <Glyphicon glyph="trash" />
            </Button>
            <td>{rowIndex}</td>
            {
                entry.map(([key, value], columnIndex) => {
                    return <td key={columnIndex}>
                        {value}
                    </td>
                })}
        </tr>);
}

function FirstToUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}