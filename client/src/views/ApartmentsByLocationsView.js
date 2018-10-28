import React from 'react'
import { connect } from 'react-redux'
import { fetchApartmentsList } from '../actions/apartmentsActions'
import * as qs from '../utils/qs'

import ApartmentTileView from '../partials/ApartmentTileItem'

class ApartmentsByLocationsView extends React.Component {
  state = {
    locality: null
  }

  componentDidUpdate = prevProps => {
    if (prevProps.location.search !== this.props.location.search) {
      const { locality = null } = qs.parse(this.props.location.search)

      this.setState({ locality })
    }
  }

  componentDidMount = () => {
    this.props.fetchApartmentsList()
    const query = this.props.location.search
      ? qs.parse(this.props.location.search)
      : null

    this.setState({ locality: query.locality })
  }

  render() {
    const { loading, error, apartments } = this.props
    if (loading) return <div>Loading</div>
    if (error) return <div>An error has occured</div>

    const locations = {
      allIds: [],
      byIds: {}
    }

    locations.byIds = apartments.allIds.reduce((accu, _id) => {
      const apartment = apartments.byIds[_id]
      return {
        ...accu,
        [apartment.location._id]: {
          ...apartment.location,
          count: accu[apartment.location._id]
            ? accu[apartment.location._id].count + 1
            : 1
        }
      }
    }, {})

    locations.allIds = Object.keys(locations.byIds)

    const filtered = apartments.allIds.filter(
      _id => apartments.byIds[_id].location._id === this.state.locality
    )

    return (
      <div className="container-list container-lg clearfix">
        <React.Fragment>
          {!this.state.locality &&
            locations.allIds.map(_id => (
              <a
                style={{ display: 'block', padding: '1rem' }}
                key={_id}
                onClick={() => this._setLocation(_id)}
              >
                {locations.byIds[_id].title} -{' '}
                {`${locations.byIds[_id].count} homes`}
              </a>
            ))}

          {this.state.locality && (
            <React.Fragment>
              <a
                onClick={() => this._setLocation()}
                style={{ display: 'block', padding: '1rem' }}
              >
                Back
              </a>
              {filtered.length < 1 && <div>Homes not found</div>}
              <div className="col-12 float-left">
                <div className="view-apartment-list">
                  {filtered.map(_id => (
                    <ApartmentTileView
                      apartment={apartments.byIds[_id]}
                      key={_id}
                    />
                  ))}
                </div>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    )
  }

  _setLocation = (locality = null) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: locality ? qs.stringify({ locality }) : ''
    })
    return this.setState({ locality })
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
)(ApartmentsByLocationsView)
