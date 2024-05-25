import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeKeepingInfo: null,
    isLoading: false,
    error: false
}

const timeKeepingSlice = createSlice({
    name: 'timekeeping',
    initialState,
    reducers: {
        getTimeKeepingStart: (state) => {
            state.isLoading = true
        },
        getTimeKeepingSuccess: (state, action) => {
            state.isLoading = false,
            state.timeKeepingInfo = action.payload,
            state.error = false
        },
        getTimeKeepingFailed: (state) => {
            state.isLoading = false,
            state.error = true
        }
    }
})

export const {
    getTimeKeepingStart,
    getTimeKeepingSuccess,
    getTimeKeepingFailed
} = timeKeepingSlice.actions;

const timeKeepingReducer = timeKeepingSlice.reducer;
export default timeKeepingReducer;