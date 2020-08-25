import React from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
    FormikText, SubmitButton,
    FormikFileField, IconSchema
} from '../CustomFormFields'

const CategoriesForm = ({ match, history, location }) => {

    const toFormData = (values) => {
        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }

        console.log(formData);
        return formData;
    }

    const handleSubmit = async (values, { resetForm }) => {
        values.mediaFile = values.mediaFile[0];
        console.log('mediafile ' + values.mediaFile.name);

        axios.post('api/Categories', toFormData(values))
            .then(res => alert(res))
            .catch(err => console.log(err));
        resetForm({});
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3)
            .max(16)
            .required(),
        mediaFile: IconSchema(true)
    });

    const initialValues = {
        name: "",
        mediaFile: [],
    }

    return (
        <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ values, dirty, isValid, setFieldValue }) => {
                return (
                    <Form className="d-block">
                        <FormikText
                            name="name"
                            label="Name"
                            required
                        />
                        <FormikFileField
                            name="mediaFile"
                            label="Category Image"
                            setFieldValue={setFieldValue}
                            icons={values.mediaFile}
                            required
                        />
                        <SubmitButton text="Create" disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CategoriesForm;