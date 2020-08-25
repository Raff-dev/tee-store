import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { IconSchema } from '../FormValidation';
import { DataToFormData } from '../ModelForm';
import { SubmitButton, FormikText, FormikFileField } from '../CustomFormFields';

const CategoryFormFields = ({ history }) => {

    const handleSubmit = async (values, { resetForm }) => {
        values.mediaFile = values.mediaFile[0];
        console.log('mediafile ' + values.mediaFile.name);

        axios.post('api/Categories', DataToFormData(values))
            .then(res => alert(res))
            .catch(err => console.log(err));
        resetForm({});
        history.push('/Admin/Categories/Read');
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3)
            .max(16)
            .required(),
        mediaFile: IconSchema(true),
    });

    const initialValues = {
        name: "",
        mediaFile: [],
    };

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, dirty, isValid }) => {
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
                        <SubmitButton text="Save" disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
}
export default CategoryFormFields;