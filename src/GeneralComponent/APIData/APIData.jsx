import React from 'react';
import {
    updateRepos,
    changeName,
    getRepos,
    changeLastName,
    changeEmail,
    deleteUser,
    editUser,
    undoEdit,
    openModalWindow,
} from './actions';
import { connect } from 'react-redux';

class APIData extends React.Component {
    componentDidMount() {
        fetch('https://budget-eb326.web.app/api/v1/contacts')
            .then((response) => response.json())
            .then((response) => {
                this.props.dispatch(getRepos(response));
            });
    }

    onChangeName = (event) => {
        let newName = event.target.value;
        this.props.dispatch(changeName(newName));
    };

    onChangeLastName = (event) => {
        let newLastName = event.target.value;
        this.props.dispatch(changeLastName(newLastName));
    };

    onChangeEmail = (event) => {
        let newEmail = event.target.value;
        this.props.dispatch(changeEmail(newEmail));
    };

    addUser = () => {
        fetch('https://budget-eb326.web.app/api/v1/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                email: this.props.email,
                modalWindow: false,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const newRepos = this.props.repos.slice();
                newRepos.push(response);
                this.props.dispatch(getRepos(newRepos));
            });
    };

    updateUser = () => {
        fetch(
            'https://budget-eb326.web.app/api/v1/contacts/' +
                this.props.editedElement,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    email: this.props.email,
                }),
            }
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const newRepos = this.props.repos.slice();
                const repoIndex = newRepos.findIndex(
                    (repo) => repo.id === this.props.editedElement
                );
                newRepos[repoIndex] = {
                    id: this.props.editedElement,
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    email: this.props.email,
                    modalWindow: false,
                };

                this.props.dispatch(updateRepos(newRepos));
            });
    };

    deleteUser = (id) => {
        fetch('https://budget-eb326.web.app/api/v1/contacts/' + id, {
            method: 'DELETE',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((response) => {
                //здесь response используется на строке 106

                const { repos } = this.props;
                const index = repos.findIndex((repo) => repo.id === id);

                const newRepos = repos.slice();
                newRepos.splice(index, 1);

                this.props.dispatch(deleteUser(newRepos));
                console.log(response);
            });
    };

    editUser = (id) => {
        const repo = this.props.repos.find((repo) => repo.id === id);

        this.props.dispatch(editUser(repo, id));
    };

    undoEdit = () => {
        this.props.dispatch(undoEdit());
    };

    openModalWindow = () => {
        this.props.dispatch(openModalWindow());
    };

    render() {
        const { editedElement, modalWindow } = this.props;
        const { repos, firstName, lastName, email } = this.props;

        console.log('props: ', this.props);

        console.log('api data render: ');

        return (
            <div>
                <div>
                    <table border="1" width="800">
                        <tbody>
                            <tr>
                                <td>
                                    <b>first name</b>
                                </td>
                                <td>
                                    <b>last name</b>
                                </td>
                                <td>
                                    <b>email</b>
                                </td>
                                <td>
                                    <b>id</b>
                                </td>
                                <td>
                                    <b>del</b>
                                </td>
                            </tr>
                            {repos.map((value) => {
                                return (
                                    <tr key={value.id}>
                                        <td>{value.firstName}</td>
                                        <td>{value.lastName}</td>
                                        <td>{value.email}</td>
                                        <td>{value.id}</td>
                                        <td
                                            onClick={() =>
                                                this.editUser(value.id)
                                            }
                                        >
                                            Edit
                                        </td>
                                        <td
                                            onClick={() =>
                                                this.deleteUser(value.id)
                                            }
                                        >
                                            x
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={this.openModalWindow}>+</button>
                </div>

                {modalWindow && (
                    <div class="modal">
                        <form>
                            <div>
                                Name:
                                <input
                                    onChange={this.onChangeName}
                                    value={firstName}
                                    id="nameID"
                                    type="text"
                                ></input>
                            </div>
                            <div>
                                Last name:
                                <input
                                    onChange={this.onChangeLastName}
                                    value={lastName}
                                    id="lastNameID"
                                    type="text"
                                ></input>
                            </div>
                            <div>
                                e-mail:
                                <input
                                    onChange={this.onChangeEmail}
                                    value={email}
                                    id="emailID"
                                    type="text"
                                ></input>
                            </div>
                            <div>id:</div>
                            <div>
                                <input
                                    onClick={
                                        editedElement
                                            ? this.updateUser
                                            : this.addUser
                                    }
                                    value="send"
                                    type="button"
                                ></input>
                                <input
                                    onClick={this.undoEdit}
                                    value="undo"
                                    type="button"
                                ></input>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        repos: store.repos,
        firstName: store.firstName,
        lastName: store.lastName,
        email: store.email,
        editedElement: store.editedElement,
        modalWindow: store.modalWindow,
    };
};

export default connect(mapStateToProps)(APIData);
