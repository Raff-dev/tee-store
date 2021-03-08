import React, { createContext } from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const theme = {
        borderColor: "",
        primary: "",
        secondary: "",
        bgPrimary: "",
        bgSecondary: "",
        success: "",
        info: "",
        disabled: "",
        danger: "",
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
