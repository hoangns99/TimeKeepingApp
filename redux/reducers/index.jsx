import { combineReducers } from "redux";
import authReducer from "./authSlice";
import addTimeKeepingReducer from "./addTimeKeepingSlice";
import updateTimeKeepingReducer from "./updateTimeKeepingSlice";
import timeKeepingReducer from "./timeKeepingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    timekeeping: timeKeepingReducer,
    addTimeKeeping: addTimeKeepingReducer,
    updateTimeKeeping: updateTimeKeepingReducer
})
export default rootReducer;