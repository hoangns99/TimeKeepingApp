import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../reducers/authSlice";
import { Alert } from "react-native";

export const loginApi = async (user, dispatch, navigation) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, user);
        dispatch(loginSuccess(res.data));
        navigation.navigate('Home');
    } catch (error) {
        dispatch(loginFailed());
        Alert.alert(error.response?.data.message);
    }
}