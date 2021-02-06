import { combineReducers } from 'redux';
import ChatReducer from './chatReducer'

const appReducer = combineReducers({
    ChatReducer: ChatReducer
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer