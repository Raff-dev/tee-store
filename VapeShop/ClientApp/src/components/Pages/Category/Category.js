import React from 'react';
import { ProductCard } from './ProductCard'
import { ItemMesh } from '../../utilities/ItemMesh'
import ScrollableTabsButtonAuto from '../../utilities/CategoriesTab'


export const Category = ({ match, location, history }) => {
    const { category } = match.params;
    return (
        <div>
            <ScrollableTabsButtonAuto />
            <ItemMesh
                path={`/api/Products/${category}`}
                ItemCard={ProductCard}
                category={category}
            />
        </div>
    );
};
