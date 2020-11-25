import React from 'react';
import { Resource } from './Resource'
import { Loadable } from '../utilities/Loadable'

export const ItemMesh = ({ ItemCard, path, ...props }) => {

    const render = data => {
        return (
            <Loadable isLoading={data.isLoading}>
                <section className={`${ItemCard.name} mesh`}>
                    {data.payload.map((item, index) => {
                        return <ItemCard item={item} index={index} {...props} />
                    })}
                </section>
            </Loadable>
        );
    }

    return <Resource path={path} render={render} />
}