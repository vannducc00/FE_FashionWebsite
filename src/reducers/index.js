import { combineReducers } from "redux";
import CountItem from './CountItem'

const myReducer = combineReducers({
    CountItem: CountItem
})

export default myReducer