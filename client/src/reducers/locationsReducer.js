import { combineReducers } from 'redux'
import {
  SET_LOCATION,
  SET_LOCATIONS_LIST,
  AP_LOCATIONS_LOADING,
  AP_LOCATIONS_ERROR
} from './../actions/types'

const initialState = {
  location: {},
  list: {
    allIds: [],
    byIds: {}
  },
  loading: true,
  error: null
}

const location = (state = initialState.location, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return action.location
    default:
      return state
  }
}

const allIds = (state = initialState.list.allIds, action) => {
  switch (action.type) {
    case SET_LOCATIONS_LIST:
      return action.allIds
    default:
      return state
  }
}

const byIds = (state = initialState.list.byIds, action) => {
  switch (action.type) {
    case SET_LOCATIONS_LIST:
      return action.byIds
    default:
      return state
  }
}

const loading = (state = initialState.loading, action) => {
  switch (action.type) {
    case AP_LOCATIONS_LOADING || AP_LOCATIONS_ERROR:
      return action.loading
    default:
      return state
  }
}

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case AP_LOCATIONS_LOADING || AP_LOCATIONS_ERROR:
      return action.error
    default:
      return state
  }
}

export default combineReducers({
  location,
  list: combineReducers({
    allIds,
    byIds
  }),
  loading,
  error
})
