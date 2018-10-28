import React from 'react'
import { connect } from 'react-redux'
import { fetchApartmentsList } from './../actions/apartmentsActions'
import ApartmentTileView from '../partials/ApartmentTileItem'

class HomeView extends React.Component {
  componentDidMount() {
    this.props.fetchApartmentsList()
  }

  render() {
    let { apartments, loading, error } = this.props
    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>{error}</div>
    }

    return (
      <div className="container-list container-lg clearfix">
        <div className="col-12 float-left">
          <div className="view-apartment-list">
            {apartments.allIds.map(_id => (
              <ApartmentTileView key={_id} apartment={apartments.byIds[_id]} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ apartments }) => ({
  apartments: apartments.list,
  loading: apartments.loading,
  error: apartments.error
})

export default connect(
  mapStateToProps,
  { fetchApartmentsList }
)(HomeView)
