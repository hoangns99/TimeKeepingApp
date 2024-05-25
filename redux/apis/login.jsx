import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../reducers/loginSlice";

const url = 'https://5481-115-79-198-245.ngrok-free.app';

export const loginApi = async (user, dispatch, navigation) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${url}/login`, user);
        dispatch(loginSuccess(res.data));
        navigation.navigate('Home');
    } catch (error) {
        dispatch(loginFailed());
    }
}