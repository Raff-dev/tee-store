import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { LinkContainer } from 'react-router-bootstrap';

export const DataTable = ({ match, entries }) => {
    const { model } = match.params;

    function getColums(entries) {
        return Object.entries(entries[0]).map(([k, v], i) => k);
    }

    const DataTableRow = (instance, rowIndex) => {
        return (
            <tr key={rowIndex} >
                <LinkContainer to={`/Admin/${model}/Update/${instance['id']}`}>
                    <Button variant="contained" color="primary">
                        <Glyphicon glyph="pencil" />
                    </Button>
                </LinkContainer>
                <LinkContainer to={`/Admin/${model}/Delete/${instance['id']}`}>
                    <Button variant="danger" >
                        <Glyphicon glyph="trash" />
                    </Button>
                </LinkContainer>
                {Object.entries(instance).map(([key, value], columnIndex) => {
                    return <td key={columnIndex}>{value}</td>
                })}
            </tr>
        );
    }

    return entries.length === 0
        ? <div className="d-flex pt-4 justify-content-center text-muted">
            <p>No {model} instances were found</p>
        </div>
        : <Table responsive>
            <thead>
                <tr>
                    <th className="action-column-name">Action</th>
                    {getColums(entries).map((column, index) => {
                        return <th key={index}>{FirstToUppercase(column)}</th>
                    })}
                </tr>
            </thead>
            <tbody>{entries.map(DataTableRow)}</tbody>
        </Table>
}

function FirstToUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}