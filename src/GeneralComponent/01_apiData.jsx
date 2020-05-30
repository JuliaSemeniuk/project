import React from 'react'

export default class APIData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            repos: [],
        };
    };

    componentDidMount () {
        fetch('https://budget-eb326.web.app/api/v1/contacts').
        then(response => response.json()).
        then(response => {
            this.setState({repos: response.map(value => ({
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                id: value.id,
            }))});
        });
    };

    render () {
        const { repos } = this.state;
        return (
            <div>
                <table border='1' width='800'>
                    <tbody>
                        <tr>
                            <td><b>first name</b></td>
                            <td><b>last name</b></td>
                            <td><b>email</b></td>
                            <td><b>id</b></td>
                        </tr>
                        {repos.map((value) => {
                            return (
                            <tr key={value.id}>
                                <td>{value.firstName}</td>
                                <td>{value.lastName}</td>
                                <td>{value.email}</td>
                                <td>{value.id}</td>
                            </tr>
                        );
                    })}</tbody>
                </table>
            </div>
        );
    };
};