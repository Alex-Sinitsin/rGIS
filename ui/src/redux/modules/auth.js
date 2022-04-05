import Cookies from 'js-cookie';

const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT_USER = "LOGOUT_USER";

const initialState = {
    user: null,
    loading: false,
    error: null
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
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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
    error: error,
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
    })
        .then(response => response.json())
        .then((data) => {
            const user = data.data
            dispatch(loginSuccess(user));
        })
        .catch(error => {
            console.log(error);
            dispatch(loginFail(error.message))
        });
}
