import { produce } from "immer";
import * as actionTypes from "../constants/userConstants"


const initialState = {
    users: [],
    selectUser: null,
    isLoading: false,
    error: null,
    searchTerm : ""
}
export const userReducer = (state = initialState, { type, payload }) => {
    return produce(state, draft => {
        if (type === actionTypes.FETCH_USERS_PENDING) {
            draft.isLoading = true;
        }
        if (type === actionTypes.FETCH_USERS_FULLFILL) {
            draft.users = payload;
            draft.isLoading = false;
        }
        if (type === actionTypes.FETCH_USERS_REJECTED) {
            draft.error = payload;
            draft.isLoading = false;
        }


        if (type === actionTypes.SELECT_USER) {
            draft.selectUser = payload
        }
        if(type === actionTypes.SEARCH_TERM){
            draft.searchTerm = payload;
        }
    })
}