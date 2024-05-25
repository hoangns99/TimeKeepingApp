import axios from "axios";
import { updateTimeKeepingFailed, updateTimeKeepingStart, updateTimeKeepingSuccess } from "../reducers/updateTimeKeepingSlice";

const url = 'https://5481-115-79-198-245.ngrok-free.app';

export const updateTimeKeepingApi = async(timeKeepingInfo, dispatch) => {
    dispatch(updateTimeKeepingStart());
    try {
        await axios.put(`${url}/timekeeping`, timeKeepingInfo);
        dispatch(updateTimeKeepingSuccess());
    } catch (error) {
        dispatch(updateTimeKeepingFailed());
    }
}