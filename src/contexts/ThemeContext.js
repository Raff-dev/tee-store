import React, { createContext } from 'react'

export const ThemeContext = createContext();

export const theme = {
    borderColor: "",
    primary: "",
    secondary: "",
    bgPrimary: "rgb(255,255,255)",
    bgSecondary: "rgb(252,252,252)",
    bgTrietary: "rgb(246,246,246)",
    bgPanel: "rgb(248, 250, 252)",

    btnPrimary: "#c60021",
    btnTextPrimary: "#fefefe",
    btnSecondary: "#f1f5f8",
    btnTextSecondary: "#3d4852",
    btnDisabled: "rgb(220, 232, 234)",
    btnTextDisabled: "",

    textDefault: "rgb(61, 72, 82)",
    textHighlight: "#c60021",
    textMuted: "rgb(135, 149, 161)",
    textInfo: "rgb(96, 111, 123)",

    borderPrimary: "rgb(238,238,238)",
    borderSecondary: "rgb(218, 225, 231)",

}

export const ThemeProvider = ({ children }) => {

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
