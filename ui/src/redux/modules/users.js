import Cookies from 'js-cookie';
import {getItemFromLocalStorage} from "../utils";

const GET_USERS = "GET_USERS";
const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
const CREATE_USER_FAIL = "CREATE_USER_FAIL";
const CHANGE_USER_ROLE_SUCCESS = "CHANGE_USER_ROLE_SUCCESS";
const CHANGE_USER_ROLE_FAIL = "CHANGE_USER_ROLE_FAIL";

const initialState = {
    users: []
}

const currentUser = getItemFromLocalStorage("auth")

export const usersReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                users: [...state.users, payload]
            };
        case CREATE_USER_FAIL:
            return {
                ...state,
                error: payload
            };
        case CHANGE_USER_ROLE_SUCCESS:
            return {
                ...state,
                users: state.users.map(user => user.id === payload[0] ? {...user, role: payload[1]} : user)
            };
        case CHANGE_USER_ROLE_FAIL:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}

export const createUserSuccess = (eventData) => ({
    type: CREATE_USER_SUCCESS,
    payload: eventData,
});

export const createUserFail = (error) => ({
    type: CREATE_USER_FAIL,
    payload: error
});

export const getUsers = () => dispatch => {
    fetch('http://' + window.location.host + '/api/users', {
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

export const createUser = (userData) => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('http://' + window.location.host + '/api/users', {
                method: 'post',
                headers: {
                    "Csrf-Token": Cookies.get('csrfCookie'),
                    "X-AUTH-TOKEN": currentUser?.accessToken,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userData),
            }
        )
            .then(response => response.json())
            .then((data) => {
                if (data.status === "success") {
                    dispatch(createUserSuccess(data.payload));
                    resolve(data);
                } else {
                    dispatch(createUserFail(data.message));
                    reject(data)
                }
            })
    })
}

export const changeUserRole = (userID, role) => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('http://' + window.location.host + '/api/users/' + userID + "/role", {
                method: 'put',
                headers: {
                    "Csrf-Token": Cookies.get('csrfCookie'),
                    "X-AUTH-TOKEN": currentUser?.accessToken,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({roleId: role}),
            }
        )
            .then(response => response.json())
            .then((data) => {
                if (data.status === "success") {
                    dispatch({type: CHANGE_USER_ROLE_SUCCESS, payload: data.payload});
                    resolve(data);
                } else {
                    dispatch({type: CHANGE_USER_ROLE_FAIL, payload: data.message});
                    reject(data)
                }
            })
    })
}