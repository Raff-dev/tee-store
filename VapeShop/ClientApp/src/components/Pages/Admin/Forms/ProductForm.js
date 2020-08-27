import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import {
    SubmitButton, FormikText, FormikSelect,
    FormikChecbox, FormikFileField
} from '../CustomFormFields'
import { IconSchema } from '../FormValidation';

const CATEGORIES = [
    { name: 'mods', id: 1 },
    { name: 'batteries', id: 2 },
    { name: 'juices', id: 3 },
];

const BRANDS = [
    { name: 'eleaf', id: 'eleaf' },
    { name: 'smoke', id: 'smoke' },
    { name: 'konia vapes', id: 'konia vapes' },
];

export const initialValues = {
    name: "konia",
    brand: BRANDS[0].id,
    categoryId: CATEGORIES[0].id,
    price: 11,
    discountDisabled: true,
    discount: 0,
    mediaFiles: []
};

const ProductForm = ({ setValidationSchema, ...props }) => {
    const [discountDisabled, setDiscountDisabled] = useState(true);

    useEffect(() => setValidationSchema(validationSchema), [discountDisabled]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(32, 'Maximmum name length is 32!')
            .required('Name is required!'),
        brand: Yup.string()
            .min(3, 'Too Short!')
            .max(32, 'Maximmum name length is 32!')
            .required('Brand is required!'),
        categoryId: Yup.number()
            .required('Category is required!'),
        price: Yup.string()
            .matches(/^[1-9][0-9]*(\.{0,1}[0-9]{1,2}){0,1}$/, {
                message: 'incorrect price format. Example: 12.99',
                excludeEmptyString: true
            })
            .required('Price is required!'),
        discount: discountDisabled
            ? null
            : Yup.number().min(0).max(100).required(),
        mediaFiles: IconSchema(true),
    });

    const { values, setFieldValue } = props;

    return (
        <div>
            <FormikText
                name="name"
                label="Product Name"
                required
            />
            <FormikSelect
                items={CATEGORIES}
                name="categoryId"
                label="Product Category"
                required
            />
            <FormikSelect
                items={BRANDS}
                name="brand"
                label="Product Brand"
                required />
            <FormikText
                name="price"
                label="Product Price"
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
                    checked={!discountDisabled}
                    onChange={e => setDiscountDisabled(!e.target.checked)}
                    name="discountDisabled"
                    label="Enable Discount"
                    color="secondary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <FormikText
                    disabled={discountDisabled}
                    name="discount"
                    label="Product Discount %"
                    required={!discountDisabled}
                />
            </div>
        </div>
    );
};

export default ProductForm;