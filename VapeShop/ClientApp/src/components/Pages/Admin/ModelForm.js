import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { SubmitButton } from './CustomFormFields';

import UserForm, { initialValues as UserInitialValues } from './Forms/UserForm'
import CategoryForm, { initialValues as CategoryInitialValues } from './Forms/CategoryForm'
import ProductForm, { initialValues as ProductInitialValues } from './Forms/ProductForm'
import ReviewForm, { initialValues as ReviewInitialValues } from './Forms/ReviewForm'
import NotFound from './Forms/NotFound'

const FORM_FIELDS = {
    'Users': UserForm,
    'Categories': CategoryForm,
    'Products': ProductForm,
    'Reviews': ReviewForm
}

const INITIAL_VALUES = {
    'Users': UserInitialValues,
    'Categories': CategoryInitialValues,
    'Products': ProductInitialValues,
    'Reviews': ReviewInitialValues
}

export const DataToFormData = (values) => {
    const formData = new FormData();

    for (let key in values) {
        if (Array.isArray(values[key])) {
            for (let elem of values[key]) {
                formData.append(key, elem);
            }
        } else {
            formData.append(key, values[key]);
        }
    }
    for (let [key, value] of formData.entries()) {
        console.log(key + ' ' + value);
    }
    return formData;
};

const ModelForm = ({ instance, match, history }) => {
    const [validationSchema, setValidationSchema] = useState(null)

    const { model } = match.params;
    const FormFields = FORM_FIELDS[model];
    const initialValues = INITIAL_VALUES[model];

    const handleSubmit = async (values) => {
        console.log(values);
        let url = `api/${model}`;
        let data = DataToFormData(values);
        let request = instance ? axios.put : axios.post;

        request(url, data).then(console.log).catch(console.log);

        history.push(`/Admin/${model}/Read`);
    }

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={instance || initialValues}
            onSubmit={handleSubmit}
        >
            {({ dirty, isValid, ...props }) => {
                return (
                    <Form className="d-block">
                        {FormFields
                            ? <FormFields
                                setValidationSchema={setValidationSchema}
                                handleSubmit={handleSubmit}
                                {...props} />
                            : <NotFound />
                        }
                        <SubmitButton text={instance ? 'Save' : 'Create'} disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
}

export default ModelForm;
