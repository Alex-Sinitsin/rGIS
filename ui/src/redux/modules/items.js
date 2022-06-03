import Cookies from 'js-cookie';
import {getItemFromLocalStorage} from "../utils";

const GET_ITEMS = "GET_ITEMS";

const initialState = {
    items: []
}

const currentUser = getItemFromLocalStorage("auth")

export const itemsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_ITEMS:
            return {
                ...state,
                items: payload
            };
        default:
            return state;
    }
}

export const getItems = () => async dispatch => {
    await fetch('http://' + window.location.host + '/api/items', {
            method: 'get',
            headers: {
                "Csrf-Token": Cookies.get('csrfCookie'),
                "X-AUTH-TOKEN": currentUser?.accessToken,
                "Content-type": "application/json"
            }
        }
    )
        .then(response => response.json())
        .then(items => {
            dispatch({type: GET_ITEMS, payload: items})
        })
}