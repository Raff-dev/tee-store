import React, { useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { DataToFormData } from '../ProductsManager/ModelForm';
import { SubmitButton, FormikText, FormikFileField } from '../../../utilities/CustomFormFields';
import { IconSchema, Exists } from '../ProductsManager/FormValidation';
import FigureImage from 'react-bootstrap/esm/FigureImage';

export const initialValues = {
    name: "",
    email: "",
    surname: "",
    displayName: "",
    mediaFile: null
}

async function getImagee(url, callback) {
    fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], 'dot.png', blob)
            console.log(file)
            callback(file)
        })
}


const UserForm = ({ setValidationSchema, ...props }) => {
    const { values, setFieldValue } = props;

    useEffect(() => {
        setValidationSchema(validationSchema);
        getImagee('images/default_avatar.png', img => setFieldValue('mediaFile', img));
    }, []);

    const validationSchema = Yup.object().shape({
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
        mediaFile: IconSchema(true),
    });

    return (
        <div>
            <img id="koniaa" />
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
        </div>
    );
};

export default UserForm;