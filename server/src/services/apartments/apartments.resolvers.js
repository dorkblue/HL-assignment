export default function(Users, Locations) {
  console.log('in apartment resolvers')
  const apartmentsResolvers = {
    Apartments: {
      owner: apartment => {
        return Users.find({ query: { _id: apartment.owner } }).then(
          result => result[0]
        )
      },
      location: apartment => {
        return Locations.find({
          // query: { _id: apartment.location }
          query: { _id: { $in: [apartment.location] } }
        }).then(result => result[0])
      },
      details: apartment => {
        return apartment.detail
      }
    }
  }

  return apartmentsResolvers
}
