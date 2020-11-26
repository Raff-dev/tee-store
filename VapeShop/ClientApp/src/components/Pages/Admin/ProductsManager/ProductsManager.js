
import React, { useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { Button } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import { LinkContainer } from 'react-router-bootstrap';
import { useToasts } from 'react-toast-notifications'

import { DeleteModal } from './DeleteModal';
import { Loadable } from '../../../utilities/Loadable'
import { ProductsModal } from './ProductsModal';
import { CategoriesModal } from './CategoriesModal';
import { DataToFormData } from './FormValidation'

export const ProductsManager = ({ loading, payload, refresh }) => {
    const [modalState, setModalState] = useState({ show: false });
    const categories = payload.map(c => ({ name: c.name, id: c.name }));

    const { addToast } = useToasts();

    const handleClose = () => {
        setModalState({ show: false })
    }

    const handleSubmit = (values, object, instance) => {
        let url = `api/${object}`
        let data = DataToFormData(values);
        let request = instance ? axios.put : axios.post;
        request(url, data)
            .then(() => showToast(true))
            .then(() => handleClose())
            .then(() => refresh())
            .catch(() => showToast(true));
    }

    const handleDelete = (object, id) => {
        axios.delete(`api/${object}/${id}`)
            .then(() => showToast(true))
            .then(() => handleClose())
            .then(() => refresh())
            .catch(() => showToast(false));
    }

    const showToast = (success) => {
        const message = success ? 'Action Succesfull!' : 'Action Failed';
        const appearance = success ? 'success' : 'error';
        addToast(
            message, {
            appearance: appearance,
            autoDismiss: true,
        })
    }

    return (
        <section>
            <ProductsModal modalState={modalState} handleSubmit={handleSubmit}
                handleClose={handleClose} categories={categories} />
            <CategoriesModal
                modalState={modalState} handleSubmit={handleSubmit} handleClose={handleClose} />
            <DeleteModal
                modalState={modalState} handleDelete={handleDelete} handleClose={handleClose} />
            <Filters />
            <br />
            <Card >
                <div className="d-flex p-2">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setModalState({ show: 'Categories' })}
                    >Add Category</Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setModalState({ show: 'Products' })}
                    >Add Product</Button>
                </div>
                <Loadable loading={loading}>
                    <Accordion>
                        {Object.entries(payload).map(c => CategoryEntry(setModalState, c))}
                    </Accordion>
                </Loadable >
            </Card>
        </section >
    );
}

const Filters = () => {
    return (
        <Card className="p-3">
            <Form.Group>
                <Form.Control type="text" placeholder="Name" />
                <br />
                <Form.Control type="text" placeholder="Brand" />
                <br />
                <Form.Control as="select" placeholder="Category" label="cate">
                    <option>Default select</option>
                    <option>Not so default select</option>
                </Form.Control>
            </Form.Group>
        </Card>
    );
}

const CategoryEntry = (setModalState, [index, { name, products }]) => {
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle disabled={!products.length} as={Button} eventKey={index}>
                    expand
                </Accordion.Toggle>
                <LinkContainer to={`/Admin/Categories/${name}`}>
                    <a>{name}</a>
                </LinkContainer>
                <span className="text-muted"> ({products.length})</span>
                <Button
                    color="secondary"
                    onClick={() => setModalState({ show: 'Delete', name: name, object: 'Categories', id: name })}
                >
                    Delete</Button>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
                <Card.Body>
                    {products.map(p => ProductEntry(setModalState, p))}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

const ProductEntry = (setModalState, { name, brand, price, id }) => {
    return (
        <article>
            <LinkContainer to={`/Admin/Products/${id}`}>
                <a>{name}</a>
            </LinkContainer>
            <span>{brand}</span>
            <span>{price}</span>
            <Button
                color="secondary"
                onClick={() => setModalState({ show: 'Delete', name: name, object: 'Products', id: id })}
            >Delete</Button>
        </article>
    );
}

