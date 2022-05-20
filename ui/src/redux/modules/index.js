import { authReducer } from "./auth";
import {itemsReducer} from "./items";
import {usersReducer} from "./users";

export const rootReducers = {
    auth: authReducer,
    items: itemsReducer,
    users: usersReducer,
};