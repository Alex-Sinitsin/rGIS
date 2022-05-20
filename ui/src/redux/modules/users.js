import Cookies from 'js-cookie';
import {getItemFromLocalStorage} from "../utils";

const GET_USERS = "GET_USERS";

const initialState = {
    users: []
}

export const usersReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload
            };
        default:
            return state;
    }
}

export const getUsers = () => dispatch => {
    const currentUser = getItemFromLocalStorage("auth")

    fetch('api/users', {
            method: 'get',
            headers: {
                "Csrf-Token": Cookies.get('csrfCookie'),
                "X-AUTH-TOKEN": currentUser?.accessToken,
                "Content-type": "application/json"
            }
        }
    )
        .then(response => response.json())
        .then(users => {
            dispatch({type: GET_USERS, payload: users})
        })
        .catch(error => console.error(error))
}