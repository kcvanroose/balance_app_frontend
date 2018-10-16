import { combineReducers } from 'redux'

    const dataReducer = (state= [], action) => {
        switch (action.type) {
            case 'GET_DATA':
                return []
            default: 
                return state
        }
    }

const rootReducer = combineReducers({
    data: dataReducer
})

export default rootReducer