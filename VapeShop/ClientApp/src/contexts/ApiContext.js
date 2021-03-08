import React, { useState, createContext, useEffect } from 'react'

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const baseUrl = 'http://127.0.0.1:8000';
    const apiUrl = 'http://127.0.0.1:8000/api/';
    const api = {
        baseUrl: baseUrl,
        apiUrl: apiUrl,
        products: apiUrl + 'Products/',
        cart: apiUrl + 'Cart/',
        cartProducts: apiUrl + 'Cart/cart_products/',
        categories: apiUrl + 'Categories/',
        collections: apiUrl + 'Collections/',
    }

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );

}
