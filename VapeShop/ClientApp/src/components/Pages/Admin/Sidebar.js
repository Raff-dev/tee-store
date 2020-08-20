import React from 'react'
import { Resource } from '../../utilities/Resource';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

export const Sidebar = (props) => {
    const render = data => {
        if (data.loading) return <Spinner animation="border" />;

        return (
            <ButtonGroup >
                {data.payload.map((model, index) => {
                    return (
                        <LinkContainer
                            key={index}
                            exact to={`/Admin/${model}`}
                            onClick={() => props.onClick(model)}
                        >
                            <Button variant="secondary">
                                {model}
                            </Button>
                        </LinkContainer>
                    );
                })}
            </ButtonGroup >
        );
    }

    return <Resource path="api/Admin/Models" render={render} />
}