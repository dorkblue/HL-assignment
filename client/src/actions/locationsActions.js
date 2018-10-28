import client from './../ApolloClient'
import {
  SET_LOCATIONS_LIST,
  SET_LOCATION,
  AP_LOCATIONS_ERROR,
  AP_LOCATIONS_LOADING
} from './types'
import { ACTIVE_LOCATIONS, LOCATION } from '../queries/locationsQueries'

const setLocationsLoading = (loading = true) => ({
  type: AP_LOCATIONS_LOADING,
  loading: loading,
  error: null
})

const setLocationsError = () => ({
  type: AP_LOCATIONS_ERROR,
  loading: false,
  error: 'An error has occured'
})

const setLocation = location => ({ type: SET_LOCATION, location })

const setLocationsList = data => {
  let byIds = data.reduce(
    (accu, location) => ({
      ...accu,
      [location._id]: location
    }),
    {}
  )

  let allIds = Object.keys(byIds)

  return {
    type: SET_LOCATIONS_LIST,
    allIds,
    byIds
  }
}

export const fetchLocationsList = () => async dispatch => {
  try {
    dispatch(setLocationsLoading())
    const { data } = await client.query({
      query: ACTIVE_LOCATIONS
    })

    dispatch(setLocationsLoading(false))
    dispatch(setLocationsList(data.locations.items))
  } catch (error) {
    dispatch(setLocationsError())
  }
}

export const fetchLocation = _id => async dispatch => {
  try {
    dispatch(setLocationsLoading())
    const { data } = await client.query({
      query: LOCATION,
      variables: {
        _id
      }
    })

    dispatch(setLocationsLoading(false))
    dispatch(setLocation(data.location))
  } catch (error) {
    dispatch(setLocationsError())
  }
}
