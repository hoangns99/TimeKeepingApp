import axios from "axios";
import { updateTimeKeepingFailed, updateTimeKeepingStart, updateTimeKeepingSuccess } from "../reducers/updateTimeKeepingSlice";

export const updateTimeKeepingApi = async(timeKeepingInfo, dispatch) => {
    dispatch(updateTimeKeepingStart());
    try {
        await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/timekeeping`, timeKeepingInfo);
        dispatch(updateTimeKeepingSuccess());
    } catch (error) {
        dispatch(updateTimeKeepingFailed());
    }
}