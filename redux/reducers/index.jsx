import { combineReducers } from "redux";
import loginReducer from "./loginSlice";
import addTimeKeepingReducer from "./addTimeKeepingSlice";
import updateTimeKeepingReducer from "./updateTimeKeepingSlice";
import timeKeepingReducer from "./timeKeepingSlice";


const rootReducer = combineReducers({
    login: loginReducer,
    timekeeping: timeKeepingReducer,
    addTimeKeeping: addTimeKeepingReducer,
    updateTimeKeeping: updateTimeKeepingReducer
})
export default rootReducer;