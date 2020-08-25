import React from 'react';
import UsersForm from './Forms/UsersForm'
import CategoriesForm from './Forms/CategoriesForm'
import ProductsForm from './Forms/ProductsForm'
import ReviewsForm from './Forms/ReviewsForm'
import NotFound from './Forms/NotFound'

const ModelForm = ({ match, history, location }) => {
    const { category } = match.params;

    const Form = ({ ...params }) => {
        switch (category) {
            case 'Users': return <UsersForm />;
            case 'Categories': return <CategoriesForm />;
            case 'Products': return <ProductsForm />;
            case 'Reviews': return <ReviewsForm />;
            default: return <NotFound />;
        }
    }

    return (
        <div>modelformitis
            <button onClick={() => history.goBack()}>bakc</button>

        </div>
    );
};

export default ModelForm;