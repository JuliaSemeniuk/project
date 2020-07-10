import React from 'react';
import APIData from './APIData';

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

class APIDataContainer extends React.Component {
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
        const {
            repos,
            firstName,
            lastName,
            email,
            editedElement,
            modalWindow,
        } = this.props;

        return (
            <APIData
                repos={repos}
                modalWindow={modalWindow}
                firstName={firstName}
                lastName={lastName}
                email={email}
                editedElement={editedElement}
                onChangeName={this.onChangeName}
                onChangeLastName={this.onChangeLastName}
                onChangeEmail={this.onChangeEmail}
                addUser={this.addUser}
                updateUser={this.updateUser}
                deleteUser={this.deleteUser}
                editUser={this.editUser}
                undoEdit={this.undoEdit}
                openModalWindow={this.openModalWindow}
            />
        ); //repos (назва змінної в компоненті APIData (компонент, в який передаємо)) = {repos} (нава змінної в цьому компоненті),  якого передаємо
    }
}

const mapStateToProps = (store) => {
    return {
        repos: store.APIData.repos,
        firstName: store.APIData.firstName,
        lastName: store.APIData.lastName,
        email: store.APIData.email,
        editedElement: store.APIData.editedElement,
        modalWindow: store.APIData.modalWindow,
    };
};

export default connect(mapStateToProps)(APIDataContainer);
