import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { SubmitButton, FormikText, FormikFileField } from '../CustomFormFields';
import { IconSchema } from '../FormValidation';

const UserFormFields = ({ submit, ...props }) => {

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Maximmum name length is 16!')
            .required('Name is required!'),
        email: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Maximmum name length is 16!')
            .email("Enter a valid E-mail address!")
            .required('Email is required!'),
        displayName: Yup.string()
            .min(3, 'Too Short!')
            .max(16, 'Maximmum name length is 16!'),
        mediaFile: IconSchema(false),
    });

    const initialValues = {
        name: "",
        email: "",
        surname: "",
        displayName: "",
        mediaFile: []
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submit}
        >
            {({ values, dirty, isValid, setFieldValue }) => {
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
                            name="mediaFile"
                            label="Profile Image"
                            setFieldValue={setFieldValue}
                            icons={values.mediaFile}
                        />
                        <SubmitButton text="Create" disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default UserFormFields;