import { useState, useEffect } from 'react';
import axios from 'axios'


export const Resource = ({ path, render, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [payload, setPayload] = useState([]);
    const [refreshVar, setRefreshVar] = useState(false);

    const refresh = () => {
        setRefreshVar(v => !v)
    }

    useEffect(() => {
        axios.get(path)
            .then(res => {
                setPayload(res.data)
                setLoading(false)
            })
            .catch(console.log)
    }, [path, refreshVar]);

    return render({ loading, payload, refresh, props });
};