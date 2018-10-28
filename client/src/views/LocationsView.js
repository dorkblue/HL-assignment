import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchLocationsList } from '../actions/locationsActions'

class LocationsView extends React.Component {
  componentDidMount = () => {
    this.props.fetchLocationsList()
  }

  render() {
    const { loading, error, locations, location: routerLocation } = this.props

    return (
      <div className="container-list container-lg clearfix">
        {loading && <div>Loading</div>}
        {error && <div>{error}</div>}
        {locations.allIds.map(_id => (
          <Link
            key={_id}
            to={{
              pathname: `${routerLocation.pathname}/${_id}`
            }}
            style={{ display: 'block', padding: '1rem' }}
          >
            {locations.byIds[_id].title}
          </Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ locations }) => ({
  locations: {
    allIds: locations.list.allIds,
    byIds: locations.list.byIds
  },
  loading: locations.loading,
  error: locations.error
})

export default connect(
  mapStateToProps,
  { fetchLocationsList }
)(LocationsView)
