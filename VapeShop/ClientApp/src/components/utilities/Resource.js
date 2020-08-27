import { Component, useState, useEffect } from 'react';
import axios from 'axios'

import React from 'react';

export const Resource = ({ path, render, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [payload, setPayload] = useState([]);

    useEffect(() => {
        axios.get(path)
            .then(res => {
                setPayload(res.data)
                setLoading(false)
            })
            .catch(console.log)
    }, [path])

    return render({ loading, payload, ...props });
};