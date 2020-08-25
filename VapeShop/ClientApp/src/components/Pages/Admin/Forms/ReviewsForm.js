import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    FormikText, SubmitButton,
    FormikSelect
} from '../CustomFormFields'

const ReviewsForm = ({ submit, ...props }) => {

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

    const ratings = [...Array(11).keys()].map((k, i) => {
        return { name: i, id: i }
    });

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3)
            .max(30)
            .required(),
        user: Yup.number()
            .required(),
        product: Yup.number()
            .required(),
        rating: Yup.number()
            .min(0)
            .max(10)
            .required(),
        review: Yup.string()
            .min(10)
            .max(100)
            .required(),
    });

    const initialValues = {
        name: "",
        user: users[0].id,
        product: products[0].id,
        rating: ratings[0].id,
        review: "",
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={submit}
        >
            {({ dirty, isValid, setFieldValue }) => {
                return (
                    <Form className="d-block">
                        <FormikText
                            name="name"
                            label="Name"
                            required
                        />
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
                            required
                            multiline
                            rows={3}
                        />
                        <SubmitButton text="Create" disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ReviewsForm;