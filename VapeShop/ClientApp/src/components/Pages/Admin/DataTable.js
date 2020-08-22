import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

export const DataTable = ({ columns, entries }) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th className="action-column-name">
                        Action
                    </th>
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