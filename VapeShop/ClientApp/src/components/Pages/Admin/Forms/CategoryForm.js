import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { IconSchema, Exists } from '../FormValidation';
import { FormikText, FormikFileField } from '../CustomFormFields';

export const initialValues = {
    name: "konia",
    mediaFile: null,
};

const CategoryForm = ({ setValidationSchema, ...props }) => {

    useEffect(() => setValidationSchema(validationSchema), []);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3)
            .max(16)
            .test('uniqueCategoryName', "This Category name already exists!",
                async value => {
                    let exists = await Exists('/api/Categories/CategoryExists', { 'name': value })
                    return !exists;
                })
            .required(),
        mediaFile: IconSchema(true),
    });

    const { values, setFieldValue } = props;

    return (
        <div>
            <FormikText
                name="name"
                label="Category Name"
                required
            />
            <FormikFileField
                name="mediaFile"
                label="Category Image"
                setFieldValue={setFieldValue}
                icons={values ? values.mediaFile : initialValues.mediaFile}
                required
            />
        </div>
    );
}
export default CategoryForm;