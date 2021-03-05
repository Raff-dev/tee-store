import React from 'react';

import { ApiContext } from '../../../contexts/ApiContext';
import { CartContext } from '../../../contexts/CartContext';

const Checkout = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    return (
        <div>CHECKOUT</div>
    );
}
export default Checkout;


