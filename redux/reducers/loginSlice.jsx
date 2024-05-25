import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoading: false,
    error: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = false,
            state.currentUser = action.payload,
            state.error = false
        },
        loginFailed: (state)=> {
            state.isLoading = false,
            state.error = true
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailed
} = loginSlice.actions;

const loginReducer = loginSlice.reducer;

export default loginReducer;