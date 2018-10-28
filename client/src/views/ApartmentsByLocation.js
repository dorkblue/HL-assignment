import React from 'react'
import { connect } from 'react-redux'
import { searchApartments } from '../actions/apartmentsActions'
import { fetchLocation } from '../actions/locationsActions'

import ApartmentTileItem from '../partials/ApartmentTileItem'

class ApartmentsByLocationsView extends React.Component {
  componentDidMount = () => {
    const { locationId } = this.props.match.params

    this.props.searchApartments(locationId)
    this.props.fetchLocation(locationId)
  }

  render() {
    const { loading, error, apartments, location } = this.props

    return (
      <div className="container-list container-lg clearfix">
        <h1>{location.title || ''}</h1>
        {loading && <div>Loading</div>}
        {error && <div>{error}</div>}
        {!loading && apartments.allIds.length < 1 && <div>Homes not found</div>}
        <div className="col-12 float-left">
          <div className="view-apartment-list">
            {apartments.allIds.map(_id => (
              <ApartmentTileItem apartment={apartments.byIds[_id]} key={_id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ apartments, locations }) => ({
  location: locations.location,
  apartments: {
    allIds: apartments.list.allIds,
    byIds: apartments.list.byIds
  },
  loading: apartments.loading,
  error: apartments.error
})

export default connect(
  mapStateToProps,
  { searchApartments, fetchLocation }
)(ApartmentsByLocationsView)
