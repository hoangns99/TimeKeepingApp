import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    success: false,
    error: false
}

const addTimeKeepingSlice = createSlice({
    name: 'addTimeKeeping',
    initialState,
    reducers: {
        addTimeKeepingStart: (state) => {
            state.isLoading = true
        },
        addTimeKeepingSuccess: (state) => {
            state.isLoading = false,
            state.success = true,
            state.error = false
        },
        addTimeKeepingFailed: (state) => {
            state.isLoading = false,
            state.success = false,
            state.error = true
        },
        cleanAddTimeKeepingStatus: (state) => {
            state.isLoading = false,
            state.success = false,
            state.error = false
        }
    }
})

export const {
    addTimeKeepingStart,
    addTimeKeepingSuccess,
    addTimeKeepingFailed,
    cleanAddTimeKeepingStatus
} = addTimeKeepingSlice.actions;

const addTimeKeepingReducer = addTimeKeepingSlice.reducer;
export default addTimeKeepingReducer;