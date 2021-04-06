import { combineReducers } from 'redux'

import businessesReducer from './features/businesses/businessesSlice'
import searchLocationReducer from './features/businesses/searchLocationSlice'

const rootReducer = combineReducers({
    businesses: businessesReducer,
    searchLocation: searchLocationReducer
})

export default rootReducer