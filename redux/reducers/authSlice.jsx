import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    currentUser: null,
    loginDate: null,
    isLoading: false,
    error: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true,
            state.errorInfo = null
        },
        loginSuccess: (state, action) => {
            state.isLoading = false,
            state.currentUser = action.payload,
            state.loginDate = moment().format('DD-MM-YYYY'),
            state.error = false
        },
        loginFailed: (state)=> {
            state.isLoading = false,
            state.error = true
        },
        logOutStart: (state) => {
            state.isLoading = true,
            state.errorInfo = null
        },
        logOutSuccess: (state) => {
            state.isLoading = false,
            state.currentUser = null,
            state.loginDate = null,
            state.error = false
        },
        logOutFailed: (state) => {
            state.isLoading = false,
            state.error = true
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed
} = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;