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
        }
    }
})

export const {
    updateTimeKeepingStart,
    updateTimeKeepingSuccess,
    updateTimeKeepingFailed
} = updateTimeKeepingSlice.actions;

const updateTimeKeepingReducer = updateTimeKeepingSlice.reducer;
export default updateTimeKeepingReducer;