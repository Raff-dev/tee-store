import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { LinkContainer } from 'react-router-bootstrap';

export const DataTable = ({ model, columns, entries }) => {

    const DataTableRow = (instance, rowIndex) => {
        return (
            <tr key={rowIndex} >
                <LinkContainer to={`/Admin/${model}/Edit`}>
                    <Button variant="contained" color="primary">
                        <Glyphicon glyph="pencil" />
                    </Button>
                </LinkContainer>
                <LinkContainer to={`/Admin/${model}/Delete`}>
                    <Button variant="danger" >
                        <Glyphicon glyph="trash" />
                    </Button>
                </LinkContainer>
                <td>{rowIndex}</td>
                {Object.entries(instance).map(([key, value], columnIndex) => {
                    return <td key={columnIndex}>{value}</td>
                })}
            </tr>
        );
    }

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th className="action-column-name">Action</th>
                    <th>Index</th>
                    {columns.map((column, index) => {
                        return <th key={index}>{FirstToUppercase(column)}</th>
                    })}
                </tr>
            </thead>
            <tbody>{entries.map(DataTableRow)}</tbody>
        </Table>
    );
}

function FirstToUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}