import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { DataToFormData } from '../ModelForm';
import { FormikText, SubmitButton, FormikSelect } from '../CustomFormFields'


export const initialValues = {
    user: "User",
    product: "Product",
    rating: "Rating",
    review: "",
};

const ReviewForm = ({ instance, match, history }) => {

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

    const handleSubmit = async (values) => {
        values.medias = values.medias[0];
        console.log('medias ' + values.medias.name);

        const request = instance ? axios.put : axios.post;
        request('api/Reviews', DataToFormData(values))
            .then(res => alert(res))
            .catch(err => console.log(err));
        history.push('/Admin/Reviews/Read');
    }

    const schema = Yup.object().shape({

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
        <Formik
            validationSchema={schema}
            initialValues={instance ? instance : initialValues}
            onSubmit={handleSubmit}
        >
            {({ dirty, isValid }) => {
                return (
                    <Form className="d-block">
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
                            rows={3}
                        />
                        <SubmitButton text="Create" disabled={!dirty || !isValid} />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ReviewForm;