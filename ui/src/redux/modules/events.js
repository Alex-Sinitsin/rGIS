import Cookies from 'js-cookie';
import {getItemFromLocalStorage} from "../utils";

const GET_EVENTS = "GET_EVENTS";
const GET_ONE_EVENT = "GET_ONE_EVENT";
const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
const CREATE_EVENT_FAIL = "CREATE_EVENT_FAIL";
const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
const UPDATE_EVENT_FAIL = "UPDATE_EVENT_FAIL";
const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
const DELETE_EVENT_FAIL = "DELETE_EVENT_FAIL";

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
        case UPDATE_EVENT_SUCCESS:
            return {
                ...state,
                events: state.events.map(event => event.id === payload.id ?
                    {...event,
                        title: payload.title,
                        startDateTime: payload.startDateTime,
                        endDateTime: payload.endDateTime,
                        orgUserId: payload.orgUserId,
                        itemId: payload.itemId,
                        description: payload.description
                    }
                    : event)
            };
        case UPDATE_EVENT_FAIL:
            return {
                ...state,
                error: payload
            };
        case DELETE_EVENT_SUCCESS:
            return {
                ...state,
                events: state.events.filter(event => event.id !== payload)
            };
        case DELETE_EVENT_FAIL:
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

export const updateEvent = (id, eventData) => async dispatch => {
    return await new Promise((resolve, reject) => {
        fetch(`api/events/${id}`, {
                method: 'put',
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
                    dispatch({type: UPDATE_EVENT_SUCCESS, payload: data.payload});
                    resolve(data);
                } else {
                    dispatch({type: UPDATE_EVENT_FAIL, payload: data.message});
                    reject(data)
                }
            })
    })
}

export const deleteEvent = (id) => async dispatch => {
    return await new Promise((resolve, reject) => {
        fetch(`api/events/${id}`, {
                method: 'delete',
                headers: {
                    "Csrf-Token": Cookies.get('csrfCookie'),
                    "X-AUTH-TOKEN": currentUser?.accessToken,
                    "Content-type": "application/json"
                },
            }
        )
            .then(response => response.json())
            .then((data) => {
                if (data.status === "success") {
                    dispatch({type: DELETE_EVENT_SUCCESS, payload: data.payload});
                    resolve(data);
                } else {
                    dispatch({type: DELETE_EVENT_FAIL, payload: data.message});
                    reject(data)
                }
            })
    })
}