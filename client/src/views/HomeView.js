import React from 'react'
import { connect } from 'react-redux'
import { fetchApartmentsList } from './../actions/apartmentsActions'
import ApartmentTileItem from '../partials/ApartmentTileItem'

class HomeView extends React.Component {
  componentDidMount = () => {
    this.props.fetchApartmentsList()
  }

  render() {
    let { apartments, loading, error } = this.props

    return (
      <div className="container-list container-lg clearfix">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <div className="col-12 float-left">
          <div className="view-apartment-list">
            {apartments.allIds.map(_id => (
              <ApartmentTileItem key={_id} apartment={apartments.byIds[_id]} />
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
  { fetchApartmentsList }
)(HomeView)
