import { authReducer } from "./auth";
import {itemsReducer} from "./items";
import {usersReducer} from "./users";
import {eventsReducer} from "./events";

export const rootReducers = {
    auth: authReducer,
    items: itemsReducer,
    users: usersReducer,
    events: eventsReducer,
};