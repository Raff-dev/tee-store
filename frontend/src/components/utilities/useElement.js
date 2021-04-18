import { useEffect } from 'react';

const useElement = ({ tag, params, onload }) => {
    useEffect(() => {
        const element = document.createElement(tag);
        console.log(element);
        Object.entries(params).forEach(([key, value]) => {
            element[key] = value;
        });

        if (onload) {
            element.addEventListener('load', onload);
        }

        document.head.appendChild(element);

        return () => {
            document.head.removeChild(element);
        }
    }, [params]);
};

export default useElement;