import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap'

export const Sidebar = ({ models, handleOnClick }) => {
    return (
        <ButtonGroup >
            {models.map((model, index) => {
                return (
                    <LinkContainer
                        key={index}
                        exact to={`/Admin/${model}/Read`}
                        onClick={() => handleOnClick(model)}
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
