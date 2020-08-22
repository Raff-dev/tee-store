import { Component } from 'react';

export class Resource extends Component {
    state = {
        paylolad: [],
        loading: true
    };

    componentDidMount() {
        fetch(this.props.path)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    payload: data,
                    loading: false
                });
            });
    }

    render() {
        return this.props.render(this.state);
    }
}
