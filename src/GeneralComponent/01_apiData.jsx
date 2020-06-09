import React from 'react'

export default class APIData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            firstName: '',
            lastName: '',
            email: '',
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

    onChangeName = (event) => {
        let newName = event.target.value;
        this.setState({firstName: newName});
    };

    onChangeLastName = (event) => {
        let newLastName = event.target.value;
        this.setState({lastName: newLastName});      
    };

    onChangeEmail = (event) => {
        let newEmail = event.target.value;
        this.setState({email: newEmail}); 
    };

    addUser = () => {

        fetch('https://budget-eb326.web.app/api/v1/contacts', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            mode:'cors',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
            })
        }).then(response => response.json()).then(response => {
            console.log(response);
            const newRepos = this.state.repos.slice();
            newRepos.push(response)
            this.setState({repos:  newRepos})} )

    };

    deleteUser = (id) => {

        fetch('https://budget-eb326.web.app/api/v1/contacts/' + id, {
            method: 'DELETE',
            mode:'cors',
        }).then(response => response.json()).then(response => {
        
            const { repos } = this.state;
            const index = repos.findIndex(repo => repo.id === id);

            const newRepos = repos.slice();
            newRepos.splice(index, 1 );
            this.setState({ repos: newRepos })


            console.log(response)
        });
            
        

        

    };

    render () {
        const { repos } = this.state;
        return (
            <div>
                <div>
                    <table border='1' width='800'>
                        <tbody>
                            <tr>
                                <td><b>first name</b></td>
                                <td><b>last name</b></td>
                                <td><b>email</b></td>
                                <td><b>id</b></td>
                                <td><b>del</b></td>
                            </tr>
                            {repos.map((value) => {
                                return (
                                <tr key={value.id}>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.email}</td>
                                    <td>{value.id}</td>
                                    <td onClick={()=>this.deleteUser(value.id)} /*id={index}*/>x</td>
                                </tr>
                            );
                        })}</tbody>
                    </table>
                </div>
                <div>
                    <form>
                        <div>Name:
                            <input onChange={this.onChangeName} value={this.state.firstName} id='nameID' type='text'></input>
                        </div>
                        <div>Last name:
                            <input onChange={this.onChangeLastName} value={this.state.lastName} id='lastNameID' type='text'></input>
                        </div>
                        <div>e-mail:
                            <input onChange={this.onChangeEmail} value={this.state.email} id='emailID' type='text'></input>    
                        </div>
                        <div>id:
                            
                        </div>
                        <div>
                            <input onClick={this.addUser} value='send' type='button'></input>
                        </div>
                    </form>
                </div>
                
            </div>
        );
    };
};