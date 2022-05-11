import { authReducer } from "./auth";
import {itemsReducer} from "./items";

export const rootReducers = {
    auth: authReducer,
    items: itemsReducer,
};