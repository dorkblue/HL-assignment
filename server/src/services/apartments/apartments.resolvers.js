export default function(Users, Locations) {
  const apartmentsResolvers = {
    Apartments: {
      owner: apartment => {
        return Users.find({ query: { _id: apartment.owner } }).then(
          result => result[0]
        )
      },
      location: apartment => {
        return Locations.find({
          // _id query is performed with a $in operator
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
