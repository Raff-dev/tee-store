import React from 'react';
import UserForm from './Forms/UserForm'
import CategoryForm from './Forms/CategoryForm'
import ProductForm from './Forms/ProductForm'
import ReviewForm from './Forms/ReviewForm'
import NotFound from './Forms/NotFound'

const ModelForm = props => {
    switch (props.match.params.model) {
        case 'Users': return <UserForm {...props} />;
        case 'Categories': return <CategoryForm {...props} />;
        case 'Products': return <ProductForm {...props} />;
        case 'Reviews': return <ReviewForm {...props} />;
        default: return <NotFound {...props} />;
    }
};

export const DataToFormData = (values) => {
    const formData = new FormData();

    for (const key in values) {
        formData.append(key, values[key]);
    }

    return formData;
};

export default ModelForm;