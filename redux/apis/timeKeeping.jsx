import axios from "axios";
import {getTimeKeepingStart, getTimeKeepingSuccess, getTimeKeepingFailed } from "../reducers/timeKeepingSlice";

const url = 'https://5481-115-79-198-245.ngrok-free.app';

export const getTimeKeepingApi = async (timeKeepingInfo, dispatch) => {
    dispatch(getTimeKeepingStart());
    try {
        const res = await axios.get(`${url}/timekeeping?ID_NV=${timeKeepingInfo.ID_NV}&TRX_DATE=${timeKeepingInfo.TRX_DATE}`);
        dispatch(getTimeKeepingSuccess(res.data));
    } catch (error) {
        dispatch(getTimeKeepingFailed());
    }
}