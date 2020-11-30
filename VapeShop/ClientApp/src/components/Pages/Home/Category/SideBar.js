import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from '@material-ui/core';

import Form from 'react-bootstrap/Form';
import { Loadable } from '../../../utilities/Loadable';
import { Resource } from '../../../utilities/Resource';

export const SideBar = ({ brands, loading, setFilters, refresh }) => {
    const [brandsSelected, setBrandsSelected] = useState([])

    const updateFilter = (name, func) => {
        setFilters((filters) => {
            filters[name] = func;
            return filters;
        })
        refresh();
    }
    const onAvailabilityChange = (event) => {
        let name = event.target.id;
        updateFilter(name, () => true);
    }

    const onPriceMinRangeChange = (event) => {
        let value = event.target.value;
        updateFilter(event.target.id, product => product.price > value);
    }

    const onPriceMaxRangeChange = (event) => {
        let value = event.target.value;
        updateFilter(event.target.id, product => product.price < value);
    }

    const onBrandChange = (event) => {
        let name = event.target.id;
        let value = event.target.checked;

        setBrandsSelected(brandsSelected => {
            if (!value) {
                let index = brandsSelected.indexOf(name);
                brandsSelected.splice(index, 1);
            }
            else if (!brandsSelected.includes(name)) {
                brandsSelected.push(name);
            }

            return brandsSelected;
        })
        updateFilter('brand', (product) => (!brandsSelected.length || brandsSelected.includes(product.brand)));
    }

    const onClear = () => setFilters({});

    return (
        <Card>
            <Form>
                <Button onClick={onClear}>Clear</Button>
                <Form.Check onChange={onAvailabilityChange} type="checkbox" id="available" label="Available" />
                <Form.Check onChange={onAvailabilityChange} type="checkbox" id="notavailable" label="Not Available" />
                <Loadable loading={loading}>
                    {brands.map((brand, index) =>
                        <Form.Check key={index} onChange={onBrandChange} type="checkbox" id={brand} label={`${brand}`} />)}
                </Loadable>
                <Form.Group >
                    <Form.Label>Price min</Form.Label>
                    <Form.Control defaultValue={0} onChange={onPriceMinRangeChange} id="pricemin" type="range" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Price max</Form.Label>
                    <Form.Control defaultValue={100} onChange={onPriceMaxRangeChange} id="pricemax" type="range" />
                </Form.Group>
            </Form>
        </Card >
    );
}