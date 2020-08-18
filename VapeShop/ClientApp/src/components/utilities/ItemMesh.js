import React from 'react';
import { Resource } from './Resource'

export const ItemMesh = (props) => {

    const render = data => {
        return (
            <div>
                {data.loading
                    ? <p>Loading...</p>
                    : <section className={`${props.ItemCard.name} mesh`}>
                        {data.payload.map((item, index) => {
                            return <props.ItemCard item={item} index={index} />
                        })}
                    </section>
                }
            </div>
        );
    }

    return <Resource path={props.path} render={render} />
}