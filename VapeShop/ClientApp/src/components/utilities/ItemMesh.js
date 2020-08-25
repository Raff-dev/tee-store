import React from 'react';
import { Resource } from './Resource'

export const ItemMesh = ({ ItemCard, path, ...props }) => {

    const render = data => {
        return (
            <div>
                {data.loading
                    ? <p>Loading...</p>
                    : <section className={`${ItemCard.name} mesh`}>
                        {data.payload.map((item, index) => {
                            return <ItemCard item={item} index={index} {...props} />
                        })}
                    </section>
                }
            </div>
        );
    }

    return <Resource path={path} render={render} />
}