import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TextField from '@material-ui/core/TextField';

import { Resource } from '../../../utilities/Resource';
import { FormControl, InputLabel, Select, FormHelperText, MenuItem } from '@material-ui/core';



export const ModelForm = (props) => {
    return <div>ModelForm</div>
}

export const FormikText = ({ name, label, type = "text", ...props }) => {
    return (
        <div className="formik-text">
            <Field
                autocomplete="off"
                as={TextField}
                label={label}
                name={name}
                type={type}
                helperText={<ErrorMessage name={name} />}
                {...props}
            />
        </div>
    );

}
const MaterialUISelectField = ({ name, label, errorMessage, children, ...props }) => {
    return (
        <FormControl {...props}>
            <InputLabel {...props}>{label}</InputLabel>
            <Select name={name} {...props}>
                {children}
            </Select>
            <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
    );
}

export const FormikSelect = ({ name, label, items, ...props }) => {
    return (
        <div className="formik-select">
            <Field
                as={MaterialUISelectField}
                name={name}
                label={label}
                errorMessage={<ErrorMessage name={name} />}
                {...props}
            >
                {items.map(item => (
                    < MenuItem key={item.id} value={item.id} >{item.name}</MenuItem>
                ))}
            </Field>
        </div >
    );
}

