import * as types from './../contants/Actionstyle'

let initialState = []

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.COUNT_ITEM:
            return state
        default: return state
    }
}

export default myReducer