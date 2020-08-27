import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { DataToFormData } from '../ModelForm';
import { SubmitButton, FormikText, FormikFileField } from '../CustomFormFields';
import { IconSchema, Exists } from '../FormValidation';

export const initialValues = {
    name: "",
    email: "",
    surname: "",
    displayName: "",
    medias: []
}

const UserForm = ({ instance, match, history }) => {

    const handleSubmit = async (values) => {
        values.medias = values.medias[0];
        console.log('medias ' + values.medias.name);

        const request = instance ? axios.put : axios.post;
        request('api/Reviews', DataToFormData(values))
            .then(res => alert(res))
            .catch(err => console.log(err));
        history.push('/Admin/Reviews/Read');
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Maximmum name length is 16!')
            .required('Name is required!'),
        email: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Maximmum name length is 16!')
            .email("Enter a valid E-mail address!")
            .test('uniqueEmail', 'This E-mail is already taken!',
                async value => {
                    let exists = await Exists('/api/Users/UserEmailExists', { 'email': value })
                    return !exists;
                })
            .required('Email is required!'),
        displayName: Yup.string()
            .min(3, 'Too Short!')
            .max(16, 'Maximmum name length is 16!'),
        medias: IconSchema(false),
    });

    return (
        <Formik
            validationSchema={schema}
            initialValues={instance ? instance : initialValues}
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
                            name="medias"
                            label="Profile Image"
                            setFieldValue={setFieldValue}
                            icons={values.medias}
                        />
                        <SubmitButton text="Create" disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default UserForm;