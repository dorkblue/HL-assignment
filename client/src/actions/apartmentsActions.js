import client from './../ApolloClient'
import {
  SET_APARTMENTS_LIST,
  SET_APARTMENT,
  SET_SEARCH_FILTERS,
  SET_LIST_LOCALITY,
  SET_LIST_FILTERS,
  AP_APARTMENTS_ERROR,
  AP_APARTMENTS_LOADING,
  RESET_SEARCH_FILTER_DEFAULT
} from './types'
import {
  ACTIVE_APARTMENTS,
  APARTMENT,
  SEARCH_APARTMENTS
} from '../queries/apartmentsQueries'

const setApartmentsLoading = (loading = true) => ({
  type: AP_APARTMENTS_LOADING,
  loading: loading,
  error: null
})

const setApartmentsError = () => ({
  type: AP_APARTMENTS_ERROR,
  loading: false,
  error: 'An error has occured'
})

const setApartment = apartment => ({ type: SET_APARTMENT, apartment })

const setApartmentsList = data => {
  let byIds = data.reduce(
    (accu, apartment) => ({
      ...accu,
      [apartment._id]: apartment
    }),
    {}
  )

  let allIds = Object.keys(byIds)

  return {
    type: SET_APARTMENTS_LIST,
    allIds,
    byIds
  }
}

const setListLocality = locality => ({
  type: SET_LIST_LOCALITY,
  locality
})

const setListFilters = filters => ({
  type: SET_LIST_FILTERS,
  filters
})

export const resetSearchFilters = (key = null) => async (
  dispatch,
  getState
) => {
  const {
    list: { filters: listFilters },
    search: { filters: searchFilters }
  } = getState().apartments
  await dispatch(
    setSearchFilters(
      key ? { ...searchFilters, [key]: listFilters[key] } : listFilters
    )
  )
}

export const resetSearchFilterToDefault = key => async (dispatch, getState) => {
  const {
    list: { locality }
  } = getState().apartments
  await dispatch({ type: RESET_SEARCH_FILTER_DEFAULT, key })
  await dispatch(searchApartments(locality))
}

export const setSearchFilters = filters => ({
  type: SET_SEARCH_FILTERS,
  filters
})

export const applyFilters = () => async (dispatch, getState) => {
  const { locality } = getState().apartments.list
  dispatch(searchApartments(locality))
}

export const searchApartments = location => async (dispatch, getState) => {
  const { filters } = getState().apartments.search
  const { details, size, price, amenities, services } = filters

  try {
    dispatch(setApartmentsLoading())

    const { data } = await client.query({
      query: SEARCH_APARTMENTS,
      variables: {
        location,
        // ...rest,
        ...(size !== '' ? { size } : {}),
        ...(price !== '' ? { price } : {}),
        ...(amenities.length > 0 ? { amenities } : {}),
        ...(services.length > 0 ? { services } : {}),
        ...Object.keys(details).reduce(
          (accu, key) => ({
            ...accu,
            ...(details[key] !== '' ? { [`details_${key}`]: details[key] } : {})
          }),
          {}
        )
      }
    })

    dispatch(setApartmentsLoading(false))
    dispatch(setListLocality(location))
    dispatch(setListFilters(filters))
    dispatch(setApartmentsList(data.searchApartments.items))
  } catch (error) {
    console.error(error)
    dispatch(setApartmentsError())
  }
}

export const fetchApartmentsList = () => async dispatch => {
  try {
    dispatch(setApartmentsLoading())
    const { data } = await client.query({
      query: ACTIVE_APARTMENTS
    })

    dispatch(setApartmentsLoading(false))
    dispatch(setApartmentsList(data.apartments.items))
  } catch (error) {
    dispatch(setApartmentsError())
  }
}

export const fetchApartment = _id => async dispatch => {
  try {
    dispatch(setApartmentsLoading())
    const { data } = await client.query({
      query: APARTMENT,
      variables: {
        _id
      }
    })

    dispatch(setApartmentsLoading(false))
    dispatch(setApartment(data.apartment))
  } catch (error) {
    dispatch(setApartmentsError())
  }
}
