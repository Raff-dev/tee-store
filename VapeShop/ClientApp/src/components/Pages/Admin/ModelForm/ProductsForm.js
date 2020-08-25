import React, { useState } from 'react'
import { Formik, Form, } from 'formik'
import * as Yup from 'yup'
import {
    SubmitButton, FormikText, FormikSelect,
    FormikChecbox, FormikFileField, IconSchema
} from './ModelForm'

export const ProductsForm = ({ submit, ...props }) => {
    const [disableDiscount, setDisableDiscount] = useState(true);

    const categories = [
        { name: 'mods', id: 1 },
        { name: 'batteries', id: 2 },
        { name: 'juices', id: 3 },
    ];

    const brands = [
        { name: 'eleaf', id: 1 },
        { name: 'smoke', id: 2 },
        { name: 'konia vapes', id: 3 },
    ];

    const discountSchema = disableDiscount
        ? null
        : Yup.number().min(0).max(100).required();

    const discountExpirationDateSchema = disableDiscount
        ? null
        : Yup.date().min(new Date().toJSON().slice(0, 10)).required();

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(32, 'Maximmum name length is 32!')
            .required('Name is required!'),
        brand: Yup.number()
            .required('Brand is required!'),
        category: Yup.number()
            .required('Category is required!'),
        price: Yup.string()
            .matches(/^[1-9][0-9]*(\.{0,1}[0-9]{1,2}){0,1}$/, {
                message: 'incorrect price format. Example: 12.99',
                excludeEmptyString: true
            })
            .required('Price is required!'),
        discount: discountSchema,
        discountExpirationDate: discountExpirationDateSchema,
        mediaFiles: IconSchema(true),
    });

    const initialValues = {
        name: "",
        brand: brands[0].id,
        category: categories[0].id,
        price: "",
        toggleDiscount: true,
        discount: "0",
        discountExpirationDate: new Date().toJSON().slice(0, -5),
        mediaFiles: []
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submit}
        >
            {({ values, dirty, isValid, setFieldValue }) => {
                return (
                    <Form className="d-block">
                        <FormikText
                            name="name"
                            label="Name"
                            required
                        />
                        <FormikSelect
                            items={categories}
                            name="category"
                            label="Category"
                            required
                        />
                        <FormikSelect
                            items={brands}
                            name="brand"
                            label="Brand"
                            required />
                        <FormikText
                            name="price"
                            label="Price"
                            required />
                        <FormikFileField
                            name="mediaFiles"
                            label="Product Images"
                            setFieldValue={setFieldValue}
                            icons={values.mediaFiles}
                            multiple
                            required
                        />
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
                                required={!disableDiscount}

                            />
                            <FormikText
                                disabled={disableDiscount}
                                name="discountExpirationDate"
                                label="Discount Expiration Date"
                                type="datetime-local"
                                required={!disableDiscount}
                            />
                        </div>
                        <SubmitButton text="Create" disabled={!dirty || !isValid} />
                    </Form >
                );
            }}
        </Formik >
    );
};


