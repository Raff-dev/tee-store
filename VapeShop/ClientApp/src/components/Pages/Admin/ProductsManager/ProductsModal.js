import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import {
    SubmitButton, FormikText, FormikSelect,
    FormikChecbox, FormikFileField
} from '../../../utilities/CustomFormFields'
import { IconSchema } from './FormValidation';

export const ProductsModal = ({ modalState, handleSubmit, handleClose, categories }) => {
    const [discountDisabled, setDiscountDisabled] = useState(true);
    const { show, instance } = modalState;

    const initialValues = {
        discountDisabled: true,
        discount: 0,
        mediaFiles: []
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(32, 'Maximmum name length is 32!')
            .required('Name is required!'),
        brand: Yup.string()
            .min(3, 'Too Short!')
            .max(32, 'Maximmum name length is 32!')
            .required('Brand is required!'),
        categoryName: Yup.string()
            .required('Category is required!'),
        price: Yup.string()
            .matches(/^[1-9][0-9]*(\.{0,1}[0-9]{1,2}){0,1}$/, {
                message: 'incorrect price format. Example: 12.99',
                excludeEmptyString: true
            })
            .required('Price is required!'),
        discount: discountDisabled
            ? null
            : Yup.number().min(0).max(100).required(),
        mediaFiles: IconSchema(true),
    });

    return (
        <Modal show={show == 'Products'} animation={false} onHide={handleClose}>
            <Formik
                validationSchema={validationSchema}
                initialValues={instance || initialValues}
                onSubmit={(values) => handleSubmit(values, 'Products', instance)}
            >
                {({ dirty, isValid, values, setFieldValue }) => {
                    return (
                        <Form className="d-block">
                            <Modal.Header closeButton>
                                <Modal.Title>Create Product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormikText
                                    name="name"
                                    label="Product Name"
                                    required
                                />
                                <FormikSelect
                                    items={categories}
                                    name="categoryName"
                                    label="Product Category"
                                    required
                                />
                                <FormikText
                                    name="brand"
                                    label="Product Brand"
                                    required />
                                <FormikText
                                    name="price"
                                    label="Product Price"
                                    required />
                                <FormikFileField
                                    name="mediaFiles"
                                    label="Product Images"
                                    setFieldValue={setFieldValue}
                                    icons={values.mediaFiles}
                                    multiple
                                    required
                                />
                                <div>
                                    <FormikChecbox
                                        checked={!discountDisabled}
                                        onChange={e => setDiscountDisabled(!e.target.checked)}
                                        name="discountDisabled"
                                        label="Enable Discount"
                                        color="secondary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                    <FormikText
                                        disabled={discountDisabled}
                                        name="discount"
                                        label="Product Discount %"
                                        required={!discountDisabled}
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button color="primary" onClick={handleClose}>Close</Button>
                                <SubmitButton text={instance ? 'Save' : 'Create'} disabled={!dirty || !isValid} />
                            </Modal.Footer>
                        </Form>
                    );
                }}

            </Formik>
        </Modal>
    );
};
