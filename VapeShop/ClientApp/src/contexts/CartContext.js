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
        let existingItem = cartCopy.find(cartItem => cartItem.id === id);
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
        let existentItem = cartCopy.find(cartItem => cartItem.id === itemId);
        if (!existentItem) return;
        existentItem.quantity += amount;
        if (existentItem.quantity <= 0) {
            cartCopy = cartCopy.filter(cartItem => cartItem.id != itemId);
        }
        setItems(cartCopy);
        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem('cart', cartString);
    }

    const removeItem = (itemId) => {
        let cartCopy = [...items];
        cartCopy = cartCopy.filter(item => item.id != itemId);
        setItems(cartCopy);
        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem('cart', cartString);
    }

    const state = {
        items: items,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }

    return (
        <CartContext.Provider value={state}>
            {children}
        </CartContext.Provider >
    );
}
