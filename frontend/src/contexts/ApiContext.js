import React, { createContext } from 'react'

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const baseUrl = 'http://127.0.0.1:8000';
    const apiUrl = 'http://127.0.0.1:8000/api/';
    const api = {
        baseUrl: baseUrl,
        apiUrl: apiUrl,
        products: apiUrl + 'Products/',
        cartProducts: apiUrl + 'Products/cart/',
        checkoutPayment: apiUrl + 'Orders/create_payment_session/',
        completePayment: apiUrl + 'Orders/confirm_payment'
    }

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );

}
