import { merge } from 'lodash'
import addQueryResolvers from './graphql.resolvers.queries.js'

import usersResolvers from '../users/users.resolvers.js'
import apartmentsResolvers from '../apartments/apartments.resolvers.js'

export default function() {
  const app = this

  const Users = app.service('users')
  const Profiles = app.service('profiles')
  const Apartments = app.service('apartments')
  const Locations = app.service('locations')

  const rootResolvers = {
    Query: {
      searchApartments: (_, args, context) => {
        const details = Object.keys(args)
          .filter(key => key.startsWith('details_'))
          .reduce((accu, key) => {
            return Object.assign({}, accu, {
              [key.replace('details_', 'detail.')]: args[key]
            })
          }, {})

        const amenities =
          args.amenities &&
          Array.isArray(args.amenities) &&
          args.amenities.length > 0
            ? { amenities: { $in: args.amenities } }
            : {}

        const services =
          args.services &&
          Array.isArray(args.services) &&
          args.services.length > 0
            ? { services: { $in: args.services } }
            : {}

        const size = args.size ? { size: { $lte: args.size } } : {}
        const price = args.price ? { price: { $lte: args.price } } : {}
        const location = args.location ? { location: args.location } : {}

        const query = Object.assign(
          {},
          location,
          size,
          price,
          amenities,
          services,
          details
        )

        return Apartments.find(
          Object.assign({}, context, {
            query
          })
        ).then(result => ({ total: result.length, items: result }))
      },
      // _id query is performed with a $in operator
      location: (root, args, context) => {
        const _id = args._id ? { _id: { $in: [args._id] } } : {}

        return Locations.find(
          Object.assign({}, context, { query: Object.assign({}, _id) })
        ).then(result => result[0])
      },
      locations: (root, args, context) => {
        return Locations.find(Object.assign({}, context, { query: args })).then(
          result => {
            return { total: result.length, items: result }
          }
        )
      }
    }
  }

  addQueryResolvers(rootResolvers.Query, Users, 'user', 'users')
  addQueryResolvers(rootResolvers.Query, Apartments, 'apartment', 'apartments')
  // addQueryResolvers(rootResolvers.Query, Locations, 'location', 'locations')

  return merge(
    rootResolvers,
    apartmentsResolvers(Users, Locations),
    usersResolvers(Profiles)
  )
}
