import Cookies from 'js-cookie';

const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT_USER = "LOGOUT_USER";

const initialState = {
    user: null,
    loading: false,
    error: ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                user: null,
                error: null,
            }
        default:
            return state;
    }
}

export const loginStart = () => ({
    type: LOGIN_START,
});

export const loginSuccess = (userInfo) => ({
    type: LOGIN_SUCCESS,
    payload: userInfo,
});

export const loginFail = (error) => ({
    type: LOGIN_FAIL,
    payload: error,
});

export const loginInitiate = (email, password) => dispatch => {
    dispatch(loginStart());

    const loginData = {
        email: email,
        password: password
    }

    fetch('api/signIn', {
            method: 'post',
            headers: {
                "Csrf-Token": Cookies.get('csrfCookie'),
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginData),
        }
    )
        .then(response => response.json())
        .then((userData) => {
            const user = userData.data
            if(userData.status === "success") {
                dispatch(loginSuccess(user));
                localStorage.setItem('auth', JSON.stringify(user))
            } else {
                dispatch(loginFail(userData.message))
            }
        })
        .catch(error => console.error(error))
}

export const logoutInitiate = (token) => dispatch => {
    fetch('api/signOut', {
            method: 'get',
            headers: {
                "Csrf-Token": Cookies.get('csrfCookie'),
                'X-Auth-Token': token,
            }
        }
    )
        .then(response => {
            if (response.ok) {
                localStorage.clear();
            }
        })
        .catch(error => console.error(error))
}
