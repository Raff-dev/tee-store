import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';



import Select from '@material-ui/core/Select';
import { ModelForm, FormikText, FormikSelect } from './ModelForm'
import * as Yup from 'yup'

export const ProductsForm = ({ submit, ...props }) => {

    const categories = [
        {
            name: 'mods',
            id: 1
        },
        {
            name: 'batteries',
            id: 2
        },
        {
            name: 'juices',
            id: 3
        },
    ]

    const brands = [
        {
            name: 'eleaf',
            id: 1
        },
        {
            name: 'smoke',
            id: 2
        },
        {
            name: 'konia vapes',
            id: 3
        },
    ]

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .required('Required!'),
        brand: Yup.number()
            .required('Required!'),
        category: Yup.number()
            .required('Required!'),
        price: Yup.number()
            .test('is-decimal', 'invalid decimal',
                value => (value + "").match(/^\d*\.{1}\d*$/))
            .required('Required!'),
        discount: Yup.number()
            .min(0)
            .max(100),
        discountExpirationDate: Yup.date()
    });


    return (
        <Formik
            initialValues={{
                name: "",
                brand: ""
            }}
            onSubmit={submit}
            validationSchema={schema}

        >
            {({ dirty, isValid }) => {
                return (
                    <Form className="d-block">
                        <FormikText name="name" label="Name" required fullWidth />
                        <FormikSelect items={categories} name="category" label="category" required fullWidth />
                        <FormikSelect items={brands} name="brand" label="brand" required fullWidth />

                        <Button
                            size="large"
                            disableElevation
                            disabled={!dirty || !isValid}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >Submit                            </Button>
                    </Form >
                );
            }}
        </Formik >
    );

    const kek = () => {
        <FormControl required >
            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
            <Select>
                {categories.map(instance => {
                    const category = { ...instance }
                    return (
                        <MenuItem value={category.id}>
                            {category.name}
                        </MenuItem>
                    )
                })}
            </Select>
            <FormHelperText>Required</FormHelperText>
        </FormControl>
    }

};


