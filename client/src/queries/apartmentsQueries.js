import gql from 'graphql-tag'

export const SEARCH_APARTMENTS = gql`
  query SearchApartments(
    $location: String
    $size: Int
    $price: Int
    $amenities: [String]
    $services: [String]

    # gql does not accept dot notation for object
    
    $details_bathrooms: Int 
    $details_rooms: Int 
    $details_floor: Int 
    $details_bedrooms: Int
  ) {
    searchApartments(
      location: $location
      size: $size
      price: $price
      amenities: $amenities
      services: $services
      details_bathrooms: $details_bathrooms
      details_rooms: $details_rooms 
      details_floor: $details_floor 
      details_bedrooms: $details_bedrooms
    ) {
      items {
        _id
        owner {
          _id
          email
        }
        title
        location {
          _id
          title
        }
        size
        price
        amenities
        details {
          bathrooms
          bedrooms
          floor
          rooms
        }
        images
      }
    }
  }
`

export const ACTIVE_APARTMENTS = gql`
  query ActiveApartments {
    apartments(active: true) {
      items {
        _id
        owner {
          _id
          email
        }
        title
        location {
          _id
          title
        }
        size
        price
        amenities
        images
      }
    }
  }
`

export const APARTMENT = gql`
  query Apartment($_id: String!) {
    apartment(_id: $_id) {
      _id
      owner {
        _id
        email
        profile {
          firstName
          lastName
          role
        }
      }
      title
      location {
        _id
        title
      }
      size
      price
      images
      amenities
      details {
        rooms
        bedrooms
        floor
        bathrooms
      }
      services
    }
  }
`
