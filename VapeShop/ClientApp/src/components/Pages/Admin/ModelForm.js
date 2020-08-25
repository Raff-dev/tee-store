import React from 'react';
import UserFormFields from './Forms/UserForm'
import CategoryFormFields from './Forms/CategoryForm'
import ProductFormFields from './Forms/ProductForm'
import ReviewFormFields from './Forms/ReviewForm'
import NotFound from './Forms/NotFound'

const ModelForm = ({ match, history, location }) => {
    const { model } = match.params;

    const FormFields = ({ ...props }) => {
        switch (model) {
            case 'Users': return <UserFormFields {...props} />;
            case 'Categories': return <CategoryFormFields {...props} />;
            case 'Products': return <ProductFormFields {...props} />;
            case 'Reviews': return <ReviewFormFields {...props} />;
            default: <NotFound {...props} />;
        }
    };

    return <FormFields history={history} />
};

export const DataToFormData = (values) => {
    const formData = new FormData();

    for (const key in values) {
        formData.append(key, values[key]);
    }

    return formData;
};

export default ModelForm;