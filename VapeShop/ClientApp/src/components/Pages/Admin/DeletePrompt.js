import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { LinkContainer } from 'react-router-bootstrap';

const DeletePrompt = ({ match, history, instance }) => {
    const { model, id } = match.params;
    return (
        <div>
            <div className="py-4">
                <div className="text-center">
                    <p>You are about to delete {model} instance.</p>
                    <p>Are you sure?</p>
                </div>
                <div className="d-flex justify-content-around py-2 px-4">
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            axios.delete(`api/${model}/${id}`)
                                .then(history.push(`/Admin/${model}/Read`));
                        }}
                    >
                        Delete
                    </Button>
                    <LinkContainer to={`/Admin/${model}/Read`}>
                        <Button color="primary" variant="contained">
                            Cancel
                    </Button>
                    </LinkContainer>
                </div>
            </div>
            <article className="p-3">
                {Object.entries(instance).map(([key, value], index) =>
                    <p><span className="font-weight-bold">{key}:</span> {value}</p>
                )}
            </article>
        </div>
    );
};

export default DeletePrompt;