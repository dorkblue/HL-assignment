import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import * as qs from '../utils/qs'
import {
  setSearchFilters,
  applyFilters,
  resetSearchFilters,
  resetSearchFilterToDefault
} from '../actions/apartmentsActions'
import CheckboxGroup from '../components/CheckboxGroup'
import RangeInput from '../components/RangeInput'
import FilterDropdown from '../components/FilterDropdown'

class ApartmentFilters extends React.Component {
  render() {
    const {
      amenities,
      services,
      size,
      price,
      details,
      setSearchFilters,
      resetSearchFilters,
      resetSearchFilterToDefault
    } = this.props
    return (
      <div>
        <FilterDropdown
          onConfirm={this.onFiltersSearch}
          onCancel={() => resetSearchFilters('size')}
          extras={[
            <Reset key={'size'} onClick={() => this.onResetToDefault('size')}>
              Reset
            </Reset>
          ]}
          title={<Title>Size</Title>}
        >
          <RangeInput
            value={size}
            onChange={({ target }) =>
              setSearchFilters({
                [target.name]: target.value
              })
            }
            label={'Size'}
            name={'size'}
            min={0}
            max={300}
            postfixUnit={' m²'}
          />
        </FilterDropdown>
        <FilterDropdown
          onConfirm={this.onFiltersSearch}
          onCancel={() => resetSearchFilters('price')}
          extras={[
            <Reset key={'price'} onClick={() => this.onResetToDefault('price')}>
              Reset
            </Reset>
          ]}
          title={<Title>Price</Title>}
        >
          <RangeInput
            value={price}
            onChange={({ target }) =>
              setSearchFilters({
                [target.name]: target.value
              })
            }
            label={'Price'}
            name={'price'}
            min={0}
            max={10000}
            postfixUnit={' €'}
          />
        </FilterDropdown>
        <FilterDropdown
          onConfirm={this.onFiltersSearch}
          onCancel={() => resetSearchFilters('details')}
          extras={[
            <Reset
              key={'details'}
              onClick={() => this.onResetToDefault('details')}
            >
              Reset
            </Reset>
          ]}
          title={<Title>Rooms</Title>}
        >
          <div>
            <label htmlFor="details.bathrooms">Bathrooms</label>
            <input
              value={details.bathrooms}
              type="number"
              name="details.bathrooms"
              onChange={({ target }) =>
                setSearchFilters({
                  details: {
                    ...details,
                    bathrooms: target.value
                  }
                })
              }
            />
          </div>
          <div>
            <label htmlFor="details.bedrooms">Bedrooms</label>
            <input
              value={details.bedrooms}
              type="number"
              name="details.bedrooms"
              onChange={({ target }) =>
                setSearchFilters({
                  details: {
                    ...details,
                    bedrooms: target.value
                  }
                })
              }
            />
          </div>
          <div>
            <label htmlFor="details.rooms">Rooms</label>
            <input
              value={details.rooms}
              type="number"
              name="details.rooms"
              onChange={({ target }) =>
                setSearchFilters({
                  details: {
                    ...details,
                    rooms: target.value
                  }
                })
              }
            />
          </div>
          <div>
            <label htmlFor="details.floor">floor</label>
            <input
              value={details.floor}
              type="number"
              name="details.floor"
              onChange={({ target }) =>
                setSearchFilters({
                  details: {
                    ...details,
                    floor: target.value
                  }
                })
              }
            />
          </div>
        </FilterDropdown>
        <FilterDropdown
          onConfirm={this.onFiltersSearch}
          onCancel={() => resetSearchFilters('amenities')}
          extras={[
            <Reset
              key={'amenities'}
              onClick={() => this.onResetToDefault('amenities')}
            >
              Reset
            </Reset>
          ]}
          title={<Title>Amenities</Title>}
        >
          <CheckboxGroup
            title={'Amenities'}
            checked={amenities}
            onChange={checked =>
              setSearchFilters({
                amenities: checked
              })
            }
            options={[
              { label: 'Television', value: 'television' },
              { label: 'Elevator', value: 'elevator' },
              { label: 'Fridge', value: 'fridge' },
              { label: 'Heating', value: 'heating' },
              { label: 'Cooker', value: 'cooker' },
              { label: 'Microwave', value: 'microwave' }
            ]}
          />
        </FilterDropdown>
        <FilterDropdown
          onConfirm={this.onFiltersSearch}
          onCancel={() => resetSearchFilters('services')}
          extras={[
            <Reset
              key={'services'}
              onClick={() => this.onResetToDefault('services')}
            >
              Reset
            </Reset>
          ]}
          title={<Title>Services</Title>}
        >
          <CheckboxGroup
            title={'Services'}
            checked={services}
            onChange={checked =>
              setSearchFilters({
                services: checked
              })
            }
            options={[
              { label: 'Concierge', value: 'concierge' },
              { label: 'Cleaning', value: 'cleaning' },
              { label: 'Full Fridge', value: 'fullFridge' },
              { label: 'Laundry', value: 'laundry' }
            ]}
          />
        </FilterDropdown>
      </div>
    )
  }

  filtersToQuerySearch = () => {
    const {
      size = '',
      price = '',
      amenities = [],
      services = [],
      details = {}
    } = this.props

    return {
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
  }

  onResetToDefault = async key => {
    const {
      locality,
      resetSearchFilterToDefault,
      history,
      location
    } = this.props
    await resetSearchFilterToDefault(key)

    history.push({
      pathname: location.pathname,
      search: qs.stringify({ locality, ...this.filtersToQuerySearch() })
    })
  }

  onFiltersSearch = async () => {
    const { locality, history, location, applyFilters } = this.props
    await applyFilters()

    history.push({
      pathname: location.pathname,
      search: qs.stringify({ locality, ...this.filtersToQuerySearch() })
    })
  }
}

const Title = styled(({ className, children, subtitle }) => (
  <div className={className}>
    {children && <div>{children}</div>}
    {subtitle && <div>{subtitle}</div>}
  </div>
))`
  display: flex;
  flex-direction: column;
`

const Reset = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: red;
`

const mapStateToProps = ({
  apartments: {
    list: { locality },
    search: { filters }
  }
}) => ({
  amenities: filters.amenities,
  services: filters.services,
  size: filters.size,
  price: filters.price,
  details: filters.details,
  locality
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      setSearchFilters,
      applyFilters,
      resetSearchFilters,
      resetSearchFilterToDefault
    }
  )(ApartmentFilters)
)
