import axios from "axios"
import * as actionTypes from "../constants/userConstants"


// mặc định redux chỉ cho phép action là 1 một plain object
// để có thể tạo được các async action, ta sử dụng 1 khái niệm của redux là middleware
// redux middleware : redux thunk, redux saga , redux observable

export const actionFetchUser = () => {
    // thunk action : nhận vào 2 tham số dispatch và getState
    // dispatch : hàm dùng để đưa các action vào store
    // getState : hàm dùng để lấy state từ store
    return async (dispatch, getState) => {
        try {
            // TRƯỜNG HỢP 1 : PENDING 
            dispatch({
                type: actionTypes.FETCH_USERS_PENDING
            })
            const {searchTerm} = getState().userReducer;
            console.log(getState().userReducer);
            const res = await axios({
                method: "GET",
                url: "https://63c63b30dcdc478e15bd64d9.mockapi.io/student",
                params: {
                    idStudent: searchTerm || undefined
                }
            })
            // TRƯỜNG HỢP 2 : FULL FILL
            dispatch({
                type: actionTypes.FETCH_USERS_FULLFILL,
                payload: res.data
            })
        } catch (err) {
            // TRƯỜNG HỢP 3 : R
            dispatch({
                type: actionTypes.FETCH_USERS_REJECTED,
                // lỗi      server          || syntax 
                payload: err.response.data || err.message
            })
            console.log(err)
        }
    }
}

export const actionCreateUser = (user) => {
    return async (dispatch) => {
        try {
            await axios({
                method: "POST",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student/`,
                data: user
            })
            // làm mới lại giao diện
            dispatch(actionFetchUser())
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const actionDeleteUser = id => {
    return async (dispatch) => {
        try {
            await axios({
                method: "DELETE",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student/${id}`,
            })
            // làm mới lại giao diện
            dispatch(actionFetchUser())
        } catch (err) {
            console.log(err)
        }
    }
}

export const actionSelectUser = id => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "GET",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student/${id}`,
            })
            dispatch({
                type: actionTypes.SELECT_USER,
                payload: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const actionUpdateUser = (payload, id) => {
    return async (dispatch) => {
        try {
            await axios({
                method: "PUT",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student/${id}`,
                data: payload
            })
            dispatch(actionFetchUser())
        } catch (err) {
            console.log(err)
        }
    }
}

export const actionSearchUser = payload => {
    return (dispatch) => {
        dispatch({
            type:actionTypes.SEARCH_TERM,
            payload
        })
        dispatch(actionFetchUser())
    }
}