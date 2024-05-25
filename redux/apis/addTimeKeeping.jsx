import axios from "axios";
import { addTimeKeepingFailed, addTimeKeepingStart, addTimeKeepingSuccess } from "../reducers/addTimeKeepingSlice"

const url = 'https://5481-115-79-198-245.ngrok-free.app';

export const addTimeKeepingApi = async(timeKeepingInfo, dispatch) => {
    dispatch(addTimeKeepingStart());
    try {
        await axios.post(`${url}/timekeeping`, timeKeepingInfo);
        dispatch(addTimeKeepingSuccess());
    } catch (error) {
        dispatch(addTimeKeepingFailed());
    }
}