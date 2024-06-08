import axios from "axios";
import { addTimeKeepingFailed, addTimeKeepingStart, addTimeKeepingSuccess } from "../reducers/addTimeKeepingSlice"

export const addTimeKeepingApi = async(timeKeepingInfo, dispatch) => {
    dispatch(addTimeKeepingStart());
    try {
        await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/timekeeping`, timeKeepingInfo);
        dispatch(addTimeKeepingSuccess());
    } catch (error) {
        dispatch(addTimeKeepingFailed());
    }
}