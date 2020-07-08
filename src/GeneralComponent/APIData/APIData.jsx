import React from 'react';

class APIData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            repos,
            modalWindow,
            firstName,
            lastName,
            email,
            editedElement,
            onChangeName,
            onChangeLastName,
            onChangeEmail,
            addUser,
            updateUser,
            deleteUser,
            editUser,
            undoEdit,
            openModalWindow,
        } = this.props;

        console.log('props:', this.props);

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
                                        <td onClick={() => editUser(value.id)}>
                                            Edit
                                        </td>
                                        <td
                                            onClick={() => deleteUser(value.id)}
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
                    <button onClick={openModalWindow}>+</button>
                </div>

                {modalWindow && (
                    <div class="modal">
                        <form>
                            <div>
                                Name:
                                <input
                                    onChange={onChangeName}
                                    value={firstName}
                                    id="nameID"
                                    type="text"
                                ></input>
                            </div>
                            <div>
                                Last name:
                                <input
                                    onChange={onChangeLastName}
                                    value={lastName}
                                    id="lastNameID"
                                    type="text"
                                ></input>
                            </div>
                            <div>
                                e-mail:
                                <input
                                    onChange={onChangeEmail}
                                    value={email}
                                    id="emailID"
                                    type="text"
                                ></input>
                            </div>
                            <div>id:</div>
                            <div>
                                <input
                                    onClick={
                                        editedElement ? updateUser : addUser
                                    }
                                    value="send"
                                    type="button"
                                ></input>
                                <input
                                    onClick={undoEdit}
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

export default APIData;
