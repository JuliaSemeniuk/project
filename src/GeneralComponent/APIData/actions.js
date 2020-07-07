import {
    GET_REPOS,
    CHANGE_NAME,
    CHANGE_LASTNAME,
    CHANGE_EMAIL,
    UPDATE_REPOS,
    EDIT_USER,
    UNDO_EDIT,
    DELETE_USER,
    OPEN_MODAL_WINDOW,
} from './constants';

export const getRepos = (response) => ({
    type: GET_REPOS,
    payload: {
        repos: response.map((value) => ({
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            id: value.id,
        })),
    },
});

export const changeName = (newName) => ({
    type: CHANGE_NAME,
    payload: {
        firstName: newName,
    },
});

export const changeLastName = (newLastName) => ({
    type: CHANGE_LASTNAME,
    payload: {
        lastName: newLastName,
    },
});

export const changeEmail = (newEmail) => ({
    type: CHANGE_EMAIL,
    payload: {
        email: newEmail,
    },
});

export const deleteUser = (newRepos) => ({
    type: DELETE_USER,
    payload: {
        repos: newRepos,
    },
});

export const updateRepos = (newRepos) => ({
    type: UPDATE_REPOS,
    payload: {
        repos: newRepos,
    },
});

export const editUser = (repo, id) => ({
    type: EDIT_USER,
    payload: {
        id,
        firstName: repo.firstName,
        lastName: repo.lastName,
        email: repo.email,
        modalWindow: true,
    },
});

export const undoEdit = () => ({
    type: UNDO_EDIT,
    payload: {
        firstName: '',
        lastName: '',
        email: '',
        editedElement: null,
        modalWindow: false,
    },
});

export const openModalWindow = () => ({
    type: OPEN_MODAL_WINDOW,
    payload: {
        modalWindow: true,
    },
});

// export const updateRepos = () => {
//     return {
//         type: 'API_DATA/UPDATE_REPOS',
//         payload: {
//             repos: newRepos,
//         },
//     };
// };
