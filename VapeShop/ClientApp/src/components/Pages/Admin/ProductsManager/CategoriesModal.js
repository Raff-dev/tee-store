import React from 'react';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { SubmitButton } from '../../../utilities/CustomFormFields';
import { FormikText, FormikFileField } from '../../../utilities/CustomFormFields';
import { IconSchema, Exists } from './FormValidation';

export const CategoriesModal = ({ modalState, handleClose, handleSubmit }) => {
    const { show, instance } = modalState;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9 ]+$/, {
                message: 'Special characters are not allowed',
                excludeEmptyString: true
            })
            .min(3, 'Too Short!')
            .max(32, 'Maximmum name length is 32!')
            .test('uniqueCategoryName', "This Category name already exists!",
                async value => {
                    let exists = await Exists('/api/Categories/Exists', { name: value })
                    return !exists;
                })
            .required(),
        mediaFile: IconSchema(true),
    });

    const initialValues = {
        name: '',
        mediaFile: null,
    };

    return (
        <Modal show={show == 'Categories'} animation={false} onHide={handleClose}>
            <Formik
                validationSchema={validationSchema}
                initialValues={instance || initialValues}
                onSubmit={(values) => handleSubmit(values, 'Categories', instance)}
            >
                {({ dirty, isValid, values, setFieldValue }) => {
                    return (
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="d-block">
                                    <FormikText
                                        name="name"
                                        label="Category Name"
                                        required
                                    />
                                    <FormikFileField
                                        name="mediaFile"
                                        label="Category Image"
                                        setFieldValue={setFieldValue}
                                        icons={values ? values.mediaFile : initialValues.mediaFile}
                                        required
                                    />
                                </Form>
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
