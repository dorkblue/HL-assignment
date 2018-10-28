import { combineReducers } from 'redux'
import {
  SET_SEARCH_FILTERS,
  SET_LIST_FILTERS,
  SET_LIST_LOCALITY,
  SET_APARTMENTS_LIST,
  SET_APARTMENT,
  AP_APARTMENTS_ERROR,
  AP_APARTMENTS_LOADING,
  RESET_SEARCH_FILTER_DEFAULT
} from './../actions/types'

const defaultFilters = {
  size: '',
  price: '',
  amenities: [],
  details: {
    bathrooms: '',
    bedrooms: '',
    rooms: '',
    floor: ''
  },
  services: []
}

const initialState = {
  apartment: {},
  list: {
    allIds: [],
    byIds: {},
    filters: defaultFilters,
    locality: null
  },
  search: {
    filters: defaultFilters
  },
  loading: true,
  error: null
}

const apartment = (state = initialState.apartment, action) => {
  switch (action.type) {
    case SET_APARTMENT:
      return action.apartment
    default:
      return state
  }
}

const allIds = (state = initialState.list.allIds, action) => {
  switch (action.type) {
    case SET_APARTMENTS_LIST:
      return action.allIds
    default:
      return state
  }
}

const byIds = (state = initialState.list.byIds, action) => {
  switch (action.type) {
    case SET_APARTMENTS_LIST:
      return action.byIds
    default:
      return state
  }
}

const listLocality = (state = initialState.list.locality, action) => {
  switch (action.type) {
    case SET_LIST_LOCALITY:
      return action.locality
    default:
      return state
  }
}

const listFilters = (state = initialState.list.filters, action) => {
  switch (action.type) {
    case SET_LIST_FILTERS:
      return {
        ...state,
        ...action.filters
      }
    default:
      return state
  }
}

const searchFilters = (state = initialState.search.filters, action) => {
  switch (action.type) {
    case SET_SEARCH_FILTERS:
      return {
        ...state,
        ...action.filters,
        details: {
          ...state.details,
          ...action.filters.details
        }
      }
    case RESET_SEARCH_FILTER_DEFAULT:
      return {
        ...state,
        [action.key]: defaultFilters[action.key]
      }
    default:
      return state
  }
}

const loading = (state = initialState.loading, action) => {
  switch (action.type) {
    case AP_APARTMENTS_LOADING || AP_APARTMENTS_ERROR:
      return action.loading
    default:
      return state
  }
}

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case AP_APARTMENTS_LOADING || AP_APARTMENTS_ERROR:
      return action.error
    default:
      return state
  }
}

export default combineReducers({
  apartment,
  list: combineReducers({
    allIds,
    byIds,
    locality: listLocality,
    filters: listFilters
  }),
  search: combineReducers({
    filters: searchFilters
  }),
  loading,
  error
})
