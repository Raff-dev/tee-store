import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
    TextField, FormControl, InputLabel,
    Select, FormHelperText, MenuItem, Checkbox, FormControlLabel
} from '@material-ui/core';

import { Resource } from '../../../utilities/Resource';


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

export const FormikChecbox = ({ name, label, ...props }) => {
    return (
        <Field
            as={FormControlLabel}
            name={name}
            label={label}
            control={<Checkbox />}
            {...props}
        />
    );

}


const MaterialUISelectField = ({ name, label, onChange, onBlur, children, value, fullWidth }) => {
    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel >{label}</InputLabel>
            <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
                {children}
            </Select>
            <FormHelperText>
                <ErrorMessage name={name} />
            </FormHelperText>
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

                {...props}
            >
                {items.map(item => (
                    < MenuItem key={item.id} value={item.id} >{item.name}</MenuItem>
                ))}
            </Field>
        </div >
    );
}

