import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    success: false,
    error: false
}

const updateTimeKeepingSlice = createSlice({
    name: 'updateTimeKeeping',
    initialState,
    reducers: {
        updateTimeKeepingStart: (state) => {
            state.isLoading = true
        },
        updateTimeKeepingSuccess: (state) => {
            state.isLoading = false,
            state.success = true,
            state.error = false
        },
        updateTimeKeepingFailed: (state) => {
            state.isLoading = false,
            state.success = false,
            state.error = true
        },
        cleanUpdateTimeKeepingStatus: (state) => {
            state.isLoading = false,
            state.success = false,
            state.error = false
        }
    }
})

export const {
    updateTimeKeepingStart,
    updateTimeKeepingSuccess,
    updateTimeKeepingFailed,
    cleanUpdateTimeKeepingStatus
} = updateTimeKeepingSlice.actions;

const updateTimeKeepingReducer = updateTimeKeepingSlice.reducer;
export default updateTimeKeepingReducer;