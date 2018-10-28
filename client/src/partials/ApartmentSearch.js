import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as qs from '../utils/qs'

import { searchApartments } from '../actions/apartmentsActions'
import ApartmentFilters from './ApartmentFilters'
import Searchbar from '../components/Searchbar'

class ApartmentSearch extends React.Component {
  _onLocationSearch = async locality => {
    const {
      searchApartments,
      history,
      location,
      filters: {
        size = '',
        price = '',
        amenities = [],
        services = [],
        details = {}
      }
    } = this.props

    await searchApartments(locality)

    const filters = {
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
    }

    history.push({
      pathname: location.pathname,
      search: qs.stringify({ locality, ...filters })
    })
  }

  render() {
    const { locations } = this.props

    return (
      <div className="container-list container-lg clearfix">
        <Wrapper className="col-12">
          <Searchbar
            placeholder={'Search for location'}
            onSelect={this._onLocationSearch}
            options={locations.allIds.map(_id => ({
              label: locations.byIds[_id].title,
              value: _id
            }))}
          />
          <ApartmentFilters />
        </Wrapper>
      </div>
    )
  }
}

const Wrapper = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
`

const mapStateToProps = ({ apartments, locations }) => ({
  filters: apartments.search.filters,
  locations: {
    allIds: locations.list.allIds,
    byIds: locations.list.byIds
  }
})

export default withRouter(
  connect(
    mapStateToProps,
    { searchApartments }
  )(ApartmentSearch)
)
