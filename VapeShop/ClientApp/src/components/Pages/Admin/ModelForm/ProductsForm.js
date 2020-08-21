import React, { useState } from 'react'
import { Formik, Form, } from 'formik'
import { Button } from '@material-ui/core'
import { FormikText, FormikSelect, FormikChecbox } from './ModelForm'
import * as Yup from 'yup'

export const ProductsForm = ({ submit, ...props }) => {
    const [disableDiscount, setDisableDiscount] = useState(true);

    const categories = [
        { name: 'mods', id: 1 },
        { name: 'batteries', id: 2 },
        { name: 'juices', id: 3 },
    ]

    const brands = [
        { name: 'eleaf', id: 1 },
        { name: 'smoke', id: 2 },
        { name: 'konia vapes', id: 3 },
    ]

    const discountSchema = disableDiscount
        ? null
        : Yup.number().min(0).max(100).required();

    const discountExpirationDateSchema = disableDiscount
        ? null
        : Yup.date().min(new Date().toJSON().slice(0, 10)).required()

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .required('Name is required!'),
        brand: Yup.number()
            .required('Brand is required!'),
        category: Yup.number()
            .required('Category is required!'),
        price: Yup.string()
            .matches(/^[1-9][0-9]*(\.{0,1}[0-9]{1,2}){0,1}$/, {
                message: 'incorrect price format. Example: 12.99',
                excludeEmptyString: true
            }
            )
            .required('Price is required!'),
        discount: discountSchema,
        discountExpirationDate: discountExpirationDateSchema
    });

    const initialValues = {
        name: "",
        brand: "",
        category: "",
        price: "",
        toggleDiscount: true,
        discount: "0.00",
        discountExpirationDate: new Date().toJSON().slice(0, -5),
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submit}
        >
            {({ dirty, isValid }) => {
                return (
                    <Form className="d-block">
                        <FormikText
                            name="name"
                            label="Name"
                            required
                            fullWidth
                            autoComplete="off" />
                        <FormikSelect
                            items={categories}
                            name="category"
                            label="category"
                            required
                            fullWidth />
                        <FormikSelect
                            items={brands}
                            name="brand"
                            label="brand"
                            required
                            fullWidth />
                        <FormikText
                            name="price"
                            label="Price"
                            required
                            fullWidth
                            autoComplete="off" />
                        <div>
                            <FormikChecbox
                                checked={!disableDiscount}
                                onChange={e => setDisableDiscount(!e.target.checked)}
                                name="toggleDiscount"
                                label="Enable Discount"
                                color="secondary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            <FormikText
                                disabled={disableDiscount}
                                name="discount"
                                label="Discount %"
                                autoComplete="off"
                                fullWidth
                                required={!disableDiscount}

                            />
                            <FormikText
                                disabled={disableDiscount}
                                name="discountExpirationDate"
                                label="Discount Expiration Date"
                                type="datetime-local"
                                placeholder=""
                                required={!disableDiscount}
                            />
                        </div>
                        <Button
                            size="large"
                            disableElevation
                            disabled={!dirty || !isValid}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form >
                );
            }}
        </Formik >
    );
};


