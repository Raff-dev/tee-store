import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core'
import { FormikText, } from './ModelForm'
import * as Yup from 'yup';

export const CategoriesForm = ({ submit, ...props }) => {
    const schema = {
        name: Yup.string()
            .min(3)
            .max(60)
            .required()
    }

    const initialValues = {
        name: ""
    }

    return (
        <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={submit}
        >
            <Form className="d-block">
                <FormikText
                    name="name"
                    label="Name"
                    required
                    fullWidth
                    autoComplete="off"
                />
                <Button size="large" disableElevation variant="contained" color="primary" type="submit">Submit</Button>
            </Form>
        </Formik>
    );
};


