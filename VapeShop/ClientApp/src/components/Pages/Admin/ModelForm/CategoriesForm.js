import React from 'react';
import { Formik, Form } from 'formik';
import { FormikText, SubmitButton, FormikFileField, IconSchema } from './ModelForm'
import * as Yup from 'yup';

export const CategoriesForm = ({ submit, ...props }) => {
    const initialValues = {
        name: "",
        iconFile: null,
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3)
            .max(16)
            .required(),
        iconFile: IconSchema
    });

    return (
        <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={submit}
        >
            {({ dirty, isValid, setFieldValue }) => {
                return (
                    <Form className="d-block">
                        <FormikText
                            name="name"
                            label="Name"
                            required
                        />
                        <FormikFileField
                            name="iconFile"
                            label="Category Image"
                            setFieldValue={setFieldValue}
                            required
                        />
                        <SubmitButton text="Create" disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
};


