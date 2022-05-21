import Cookies from 'js-cookie';
import {getItemFromLocalStorage} from "../utils";

const GET_EVENTS = "GET_EVENTS";
const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
const CREATE_EVENT_FAIL = "CREATE_EVENT_FAIL";

const initialState = {
    events: [],
    error: null
}

const currentUser = getItemFromLocalStorage("auth");

export const eventsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_EVENTS:
            return {
                ...state,
                events: payload
            };
        case CREATE_EVENT_SUCCESS:
            return {
                ...state,
                events: [...state.events, payload]
            };
        case CREATE_EVENT_FAIL:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}

export const createEventSuccess = (eventData) => ({
    type: CREATE_EVENT_SUCCESS,
    payload: eventData,
});
export const createEventFail = (error) => ({
    type: CREATE_EVENT_FAIL,
    payload: error
});

export const createEvent = (eventData) => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('api/events', {
                method: 'post',
                headers: {
                    "Csrf-Token": Cookies.get('csrfCookie'),
                    "X-AUTH-TOKEN": currentUser?.accessToken,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(eventData),
            }
        )
            .then(response => response.json())
            .then((data) => {
                if(data.status === "success") {
                    dispatch(createEventSuccess(data.payload));
                    resolve(data);
                } else {
                    dispatch(createEventFail(data.message));
                    reject(data)
                }
            })
    })
}