import React, { useState, createContext, useEffect } from 'react'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    let [items, setItems] = useState([])
    let localCart = localStorage.getItem("cart");

    useEffect(() => {
        try {
            localCart = JSON.parse(localCart);
        } catch (error) {
            localStorage.cart = undefined;
            localCart = null;
        }
        if (localCart) setItems(localCart)
    }, []);

    const addItem = (id) => {
        let cartCopy = [...items];
        let existingItem = cartCopy.find(cartItem => parseInt(cartItem.id, 10) === parseInt(id, 10));
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            let item = { id: id, quantity: 1 };
            cartCopy.push(item);
        }

        setItems(cartCopy);
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart);
    }

    const updateItem = (itemId, amount) => {
        let cartCopy = [...items];
        let existentItem = cartCopy.find(cartItem => parseInt(cartItem.id, 10) === parseInt(itemId, 10));
        console.log('existentItem')
        console.log(existentItem)
        if (!existentItem) return;
        existentItem.quantity = amount;
        if (existentItem.quantity <= 0) {
            cartCopy = cartCopy.filter(cartItem => parseInt(cartItem.id, 10) !== parseInt(itemId, 10));
        }
        setItems(cartCopy);
        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem('cart', cartString);
    }

    const removeItem = (itemId) => {
        let cartCopy = [...items];
        cartCopy = cartCopy.filter(item => parseInt(item.id, 10) !== parseInt(itemId, 10));
        setItems(cartCopy);
        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem('cart', cartString);
    }
    const clearItems = () => {
        localStorage.cart = undefined;
        localCart = null;
        setItems([]);
    }

    const quantityMap = items.reduce(
        (all, item) => ({ ...all, [item.id]: item.quantity }), {});

    const subtotal = (cartProducts) => Math.round(cartProducts.reduce((sum, product) =>
        sum + product.price * quantityMap[product.id], 0) * 100) / 100;

    const state = {
        items: items,
        ids: items.map((item, index) => parseInt(item.id, 10)),
        shipping: 14.99,
        addItem: addItem,
        subtotal: subtotal,
        updateItem: updateItem,
        removeItem: removeItem,
        clearItems: clearItems,
        quantityMap: quantityMap,
        currency: "€"
    }

    return (
        <CartContext.Provider value={state}>
            {children}
        </CartContext.Provider >
    );
}
