import React, { useEffect } from 'react';
import * as Yup from 'yup';

import { FormikText, FormikSelect } from '../../../utilities/CustomFormFields'

export const initialValues = {
    user: "User",
    product: "Product",
    rating: "Rating",
    review: "",
};

const ReviewForm = ({ setValidationSchema, ...props }) => {
    const { values, setFieldValue } = props;

    useEffect(() => setValidationSchema(validationSchema), []);

    const products = [
        { name: 'ijust1', id: 1 },
        { name: 'ijust2', id: 2 },
        { name: 'ijust3', id: 3 },
    ];

    const users = [
        { name: 'user1@user.com', id: 1 },
        { name: 'user2@user.com', id: 2 },
        { name: 'user3@user.com', id: 3 },
    ];

    const ratings = [...Array(10).keys()].map((k, i) => {
        return { name: i + 1, id: i + 1 }
    });

    const validationSchema = Yup.object().shape({

        user: Yup.number()
            .required(),
        product: Yup.number()
            .required(),
        rating: Yup.number()
            .required(),
        review: Yup.string()
            .max(300)
    });

    return (
        <div>
            <FormikSelect
                name="user"
                label="User"
                items={users}
                required
            />
            <FormikSelect
                name="product"
                label="Product"
                items={products}
                required
            />
            <FormikSelect
                name="rating"
                label="Rating"
                items={ratings}
                required
            />
            <FormikText
                name="review"
                label="Review"
                multiline
                rows={6}
            />
        </div>
    );
};
export default ReviewForm;