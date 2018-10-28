import React from 'react'
import { connect } from 'react-redux'
import * as qs from '../utils/qs'

import {
  searchApartments,
  setSearchFilters
} from '../actions/apartmentsActions'
import {
  fetchLocationsList
} from '../actions/locationsActions'
import ApartmentSearch from '../partials/ApartmentSearch'
import ApartmentTileItem from '../partials/ApartmentTileItem'

class ApartmentSearchView extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { locality = null, ...filters } = qs.parse(this.props.location.search)

    const {
      size = '',
      price = '',
      amenities = [],
      services = [],
      details = {}
    } = filters

    await this.props.setSearchFilters({
      ...(size ? { size } : {}),
      ...(price ? { price } : {}),
      ...(Array.isArray(amenities) && amenities.length ? { amenities } : {}),
      ...(Array.isArray(services) && services.length ? { services } : {}),
      ...(Object.keys(details).length
        ? {
          details: Object.keys(details).reduce((accu, key) => {
            if (details[key]) {
              return { ...accu, [key]: details[key] }
            }

            return accu
          }, {})
        }
        : {})
    })
    this.props.fetchLocationsList()
    this.props.searchApartments(locality)
  }

  render() {
    const { apartments, loading, error } = this.props

    return (
      <div className="container-list container-lg clearfix">
        <ApartmentSearch />
        <div className="col-12 float-left">
          <div className="view-apartment-list">
            {loading && <div>Loading</div>}
            {error && <div>{error}</div>}
            {apartments.allIds.map(_id => (
              <ApartmentTileItem apartment={apartments.byIds[_id]} key={_id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ apartments }) => ({
  apartments: {
    allIds: apartments.list.allIds,
    byIds: apartments.list.byIds
  },
  loading: apartments.loading,
  error: apartments.error
})

export default connect(
  mapStateToProps,
  { searchApartments, setSearchFilters, fetchLocationsList }
)(ApartmentSearchView)
