import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core'

import { Resource } from '../../../utilities/Resource';

export const UsersForm = ({ submit, ...props }) => {
    return (
        <Formik
            initialValues={{
                name: "Name", email: "E-mail"
            }}
            onSubmit={submit}
        >
            <div>Users</div>
            <Form className="d-block">
                <Field name="name" type="text" />
                <Field name="email" type="email" />
                <Button size="large" disableElevation variant="contained" color="primary" type="submit">Submit</Button>
            </Form>

        </Formik>
    );
};
