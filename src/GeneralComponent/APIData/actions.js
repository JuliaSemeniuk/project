import { UPDATE_REPOS, CHANGE_NAME, GET_REPOS } from './constants';

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
    type: 'API_DATA/CHANGE_LASTNAME',
    payload: {
        lastName: newLastName,
    },
});

export const changeEmail = (newEmail) => ({
    type: 'API_DATA/CHANG_EMAIL',
    payload: {
        email: newEmail,
    },
});

export const deleteUser = (newRepos) => ({
    type: 'API_DATA/DELETE_REPO',
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
    type: 'API_DATA/EDIT_USER',
    payload: {
        id,
        firstName: repo.firstName,
        lastName: repo.lastName,
        email: repo.email,
        modalWindow: true,
    },
});

export const undoEdit = () => ({
    type: 'API_DATA/UNDO_EDIT',
    payload: {
        firstName: '',
        lastName: '',
        email: '',
        editedElement: null,
        modalWindow: false,
    },
});

export const openModalWindow = () => ({
    type: 'API_DATA/OPEN_MODAL_WINDOW',
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
