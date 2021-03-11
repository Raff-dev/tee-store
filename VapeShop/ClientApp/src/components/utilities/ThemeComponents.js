import styled from "styled-components";
import { theme } from '../../contexts/ThemeContext'
import { Grid } from 'react-bootstrap';

const getButtonColor = (props) => {
    if (props.disabled) {
        return theme.btnDisabled;
    } else if (props.primary) {
        return theme.btnPrimary
    }
    return theme.btnSecondary
}
const getButtonTextColor = (props) => {
    if (props.primary) {
        return theme.btnTextPrimary;
    }
    return theme.btnTextSecondary;

}

const getTextColor = (props) => {
    if (props.highlight) {
        return theme.text.highlight
    } else if (props.muted) {
        return theme.textMuted
    } else if (props.info) {
        return theme.textInfo
    }
    return theme.textDefault
}

export const Button = styled.button`
    background-color: ${getButtonColor};
    color: ${getButtonTextColor};
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius:5px;
    text-align:center;
    padding: 12px;
    width:100%;
    font-size:1.2rem;
    font-weight: 500;
    font-family: system-ui;
    outline:none;
    letter-spacing:2px;
    text-transform: uppercase;

    :hover{
        background-color: ${getButtonColor};
        color: ${getButtonTextColor};
        box-shadow: inset 0px 0px 400px 110px rgba(0, 0, 0, .1);
        border-color: #efefef;
        cursor: pointer;
    }
    :active{
        border-color: #ddd;
        outline:none;
    }
    :focus{
        outline:none;
    }

`;

export const PageSection = styled(Grid)`
    margin-top: 20px;
    min-height: 100vh;
`;

export const PageTitle = styled.span`
    width: 100%;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight:500;
    color:rgba(0,0,0,0.7);

`;

export const Text = styled.span`
    color: ${getTextColor};
`;

export const ListEntry = styled.div`
    display:flex;
    justify-content:space-between;
    border-bottom: 1px solid rgb(241, 245, 248);
    padding-bottom:15px;
    margin-top:20px;
`;
