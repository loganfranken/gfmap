import { combineReducers } from 'redux'

import businessesReducer from './features/businesses/businessesSlice.js'
import searchLocationReducer from './features/searchLocation/searchLocationSlice.js'

const rootReducer = combineReducers({
    businesses: businessesReducer,
    searchLocation: searchLocationReducer
})

export default rootReducer