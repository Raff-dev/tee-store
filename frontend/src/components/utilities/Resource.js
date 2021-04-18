import { useState, useEffect } from 'react';
import axios from 'axios'


export const Resource = ({ path, data, children, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [payload, setPayload] = useState([]);
    const [refreshVar, setRefreshVar] = useState(false);

    const refresh = () => {
        setRefreshVar(v => !v)
    }

    useEffect(() => {
        let func = data ? axios.post : axios.get;
        func(path, data)
            .then(res => {
                setPayload(res.data)
                setLoading(false)
            })
            .catch(console.log)
    }, [path, refreshVar, data]);

    return children({ loading, payload, refresh, ...props });
};