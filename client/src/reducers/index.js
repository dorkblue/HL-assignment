import { combineReducers } from 'redux'
// import apartmentsListReducer from './apartmentsListReducer'
// import apartmentReducer from './apartmentReducer'
import apartments from './apartmentsReducer'
import locations from './locationsReducer'

export default combineReducers({
  // apartmentsList: apartmentsListReducer,
  // apartmentItem: apartmentReducer
  locations,
  apartments
})
