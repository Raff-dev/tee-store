import React, { Component } from 'react'
import { Resource } from './utilities/Resource';


export class Category extends Component {


    Mesh = (props) => {

        const render = (data) => {

        }

        return (
            <Resource
                path='api/categories'
                render={render}
            />
        );
    }

}
