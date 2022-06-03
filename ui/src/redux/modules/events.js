import Cookies from 'js-cookie';
import {getItemFromLocalStorage} from "../utils";

const GET_EVENTS = "GET_EVENTS";
const GET_ONE_EVENT = "GET_ONE_EVENT";
const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
const CREATE_EVENT_FAIL = "CREATE_EVENT_FAIL";

const initialState = {
    events: [],
    singleEvent: {},
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
        case GET_ONE_EVENT:
            return {
                ...state,
                events: [...state.events],
                singleEvent: payload
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

export const getEvents = (token) => async dispatch => {
    await fetch('api/events', {
            method: 'get',
            headers: {
                "Csrf-Token": Cookies.get('csrfCookie'),
                "X-AUTH-TOKEN": token,
                "Content-type": "application/json"
            },
        }
    )
        .then(response => response.json())
        .then((events) => {
            dispatch({type: GET_EVENTS, payload: events});
        })
}

export const getOneEvent = (eventID) => async dispatch => {
    await fetch(`api/events/${eventID}`, {
            method: 'get',
            headers: {
                "Csrf-Token": Cookies.get('csrfCookie'),
                "X-AUTH-TOKEN": currentUser?.accessToken,
                "Content-type": "application/json"
            },
        }
    )
        .then(response => response.json())
        .then((data) => {
            dispatch({type: GET_ONE_EVENT, payload: data});
        })
}

export const createEvent = (eventData) => async dispatch => {
    return await new Promise((resolve, reject) => {
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
                if (data.status === "success") {
                    dispatch(createEventSuccess(data.payload));
                    resolve(data);
                } else {
                    dispatch(createEventFail(data.message));
                    reject(data)
                }
            })
    })
}