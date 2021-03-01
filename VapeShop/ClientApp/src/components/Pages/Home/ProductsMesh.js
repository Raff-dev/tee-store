import React from 'react';
import { Loadable } from '../../utilities/Loadable'
import { Resource } from '../../utilities/Resource'
import { ProductCard } from './ProductCard'

export const ProductsMesh = ({ category, collection }) => {
    return (
        <Resource path={'/api/Categories/' + category} >
            {({ payload, loading }) =>
                <section className="category-mesh">
                    <Loadable loading={loading}>
                        {payload.map((item, index) =>
                            <ProductCard item={item} index={index} />
                        )}
                    </Loadable>
                </section>
            }
        </Resource>
    );
}