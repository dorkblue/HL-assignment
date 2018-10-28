import gql from 'graphql-tag'

export const ACTIVE_LOCATIONS = gql`
  query ActiveLocations {
    locations(active: true) {
      items {
        _id
        title
      }
    }
  }
`

export const LOCATION = gql`
  query Location($_id: String!) {
    location(_id: $_id) {
      _id
      title
    }
  }
`
