import { useState, useEffect } from 'react';
import axios from 'axios'


export const Resource = ({ path, children, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [payload, setPayload] = useState([]);
    const [refreshVar, setRefreshVar] = useState(false);
    const [data, setData] = useState(null);

    const refresh = () => {
        setRefreshVar(v => !v)
    }

    useEffect(() => {
        axios.get(path, data)
            .then(res => {
                setPayload(res.data)
                setLoading(false)
            })
            .catch(console.log)
    }, [path, refreshVar, data]);

    return children({ loading, payload, refresh, setData, ...props });
};