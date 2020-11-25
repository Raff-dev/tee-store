import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

export const Loadable = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <div className="p-3 justify-content-center d-flex text-muted">
                <Spinner className="mh-2" animation="border" variant="primary" />
            </div>
        );
    } else if (!isLoading && !children) {
        return (
            <span>There is no content to display</span>
        );
    } else {
        return (children);
    }
}