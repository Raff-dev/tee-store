import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { SubmitButton, FormikText, FormikFileField, IconSchema } from './ModelForm';

export const UsersForm = ({ submit, ...props }) => {
    const initialValues = {
        name: "",
        email: "",
        surname: "",
        displayName: "",
        iconFile: null
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Maximmum name length is 16!')
            .required('Name is required!'),
        email: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Maximmum name length is 16!')
            .required('Email is required!'),
        displayName: Yup.string()
            .min(3, 'Too Short!')
            .max(16, 'Maximmum name length is 16!'),
        iconFile: IconSchema
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submit}
        >
            {({ dirty, isValid, setFieldValue }) => {
                console.log('isvalid' + isValid)
                return (
                    <Form className="d-block">
                        <FormikText
                            name="name"
                            label="Name"
                            required
                        />
                        <FormikText
                            name="surname"
                            label="Surname"
                            required />
                        <FormikText
                            name="email"
                            label="E-mail"
                            required />
                        <FormikText
                            name="displayName"
                            label="Display Name" />
                        <FormikFileField
                            name="iconFile"
                            label="Profile Image"
                            setFieldValue={setFieldValue}
                        />
                        <SubmitButton text="Create" disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
};