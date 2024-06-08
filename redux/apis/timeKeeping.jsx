import axios from "axios";
import {getTimeKeepingStart, getTimeKeepingSuccess, getTimeKeepingFailed } from "../reducers/timeKeepingSlice";

export const getTimeKeepingApi = async (timeKeepingInfo, dispatch) => {
    dispatch(getTimeKeepingStart());
    try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/timekeeping?TEN_NV=${timeKeepingInfo.TEN_NV}&TRX_DATE=${timeKeepingInfo.TRX_DATE}`);
        dispatch(getTimeKeepingSuccess(res.data));
    } catch (error) {
        dispatch(getTimeKeepingFailed());
    }
}