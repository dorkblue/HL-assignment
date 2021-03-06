Homelike Interview Assignment
=====

#### How to use
1. Clone repo
2. cd server && npm install && npm start
3. cd client && npm install && npm start
4. browser will be launched, app will be running on localhost

#### Visit link (in localhost environment) for featured pages
[Home](http://localhost:3000)

[Locations & Apartments by Location](http://localhost:3000/locations)

[Search & Filter](http://localhost:3000/search)

---

Instructions for Client (Front-end) Assignment
------
1. Invest some time to refactor the current code and make it better
    - please also tell us what you did
2. Add webpack
3. Add information about owner to apartment view page
4. Add new page "Locations", show the apartments filtered by location
5. Add new page "search page", provide abilities to search by location and filter by [size, price, amenities, details, services]

---

Development
------

#### Code Refactoring
* Added `<Switch />` to App.js

    To ensure exclusive rendering of the first `<Route />` child
   
* Added missing `key` to array of component items
* Removed `componentWillMount` and added `componentDidMount`

    `componentWillMount` is now classifed as unsafe legacy code. Advised generally by React team to avoid introducing side effects or subscriptions here. Also deprecated due to its incompatability with async rendering that is going to be introduced in the near future

* Data from server is shallowly normalized before caching in Redux store.
    
    Normalized data makes retrieving or updating a given item fairly simple and consistent

    ```javascript
    const apartmentsData = [
            {
              "_id": "dJkEVfSV2mbgYak6TCDhqtsA",
              "title": "Studio Apartment Single",
              "location": {
                "_id": "5b62B540BcFF044ffA169f60"
              }
            },
            {
              "_id": "7ZMdBqVNLpzg6N6EtB2MWZ6z",
              "title": "Apartment mit Balkon",
              "location": {
                "_id": "5b62B540BcFF044ffA169f60"
              }
            },
            ...
          ]

    const apartments = {
        allIds: ["dJkEVfSV2mbgYak6TCDhqtsA", "7ZMdBqVNLpzg6N6EtB2MWZ6z", ...],
        byIds: {
            "dJkEVfSV2mbgYak6TCDhqtsA": {
              "_id": "dJkEVfSV2mbgYak6TCDhqtsA",
              "title": "Studio Apartment Single",
              "location": {
                "_id": "5b62B540BcFF044ffA169f60"
              }
            },
            "7ZMdBqVNLpzg6N6EtB2MWZ6z" : {
              "_id": "7ZMdBqVNLpzg6N6EtB2MWZ6z",
              "title": "Apartment mit Balkon",
              "location": {
                "_id": "5b62B540BcFF044ffA169f60"
              }
            },
            ...
        }
    }

    ```
* Improved `Actions` and `Reducer` for Apartment and Location

* Added `try catch` for thunk actions to catch and respond to errors

* Reorganized some files and folders, separation of concern
    
    - Separate partial view components and components from view components
    - partials and components folder can be further split into sub folders for better organization

#### Add Owner's Info to Apartment View Page

Retrieve `firstName` and `lastName` from `Profile` schema.
```javascript
{
  "_id": "hRPEGtRVBRfKN9BvuYEPTwa",
  "email": "owner.o1@assignment.cc",
  "profile": {
    "firstName": "Owner",
    "lastName": "Numer1",
    "role": "landlord"
  }
}
```


Fixed minor bug on `server` in order to retrieve `Profile` field of `User` that has the Owner's info.


Before
```javascript
// server/src/services/users/users.resolvers.js

export default function (Profiles) {
  const usersResolvers = {
    Users: {
      profile: (user) => {
        return Users.find({ query: { _id: user.owner }}).then(result=>result.data[0]);
      }
    }
  };

  return usersResolvers;
}
```

After
> Replaced **Users.find** with **Profiles.find**
```javascript
export default function(Profiles) {
  const usersResolvers = {
    Users: {
      profile: user => {
        return Profiles.find({ query: { _id: user.owner } }).then(
          result => result[0]
        )
      }
    }
  }

  return usersResolvers
}
```

#### New 'Locations' Page, Apartments Filtered by Location

Fixed `_id` query bug for Location Schema. Equality `_id` query for some reason do not work with Location Schema. 

As a **short term fix** & as a prioritization for **Client Assignment requirements**, following fix is applied for queries applicable for Location.

> Removed `addQueryResolvers(rootResolvers.Query, Locations, 'location', 'locations')` and added the following
```javascript
// client/src/services/graphql/graphql.resolvers.js

const rootResolvers = {
    Query: {
      ...,
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
  
// client/src/services/apartments/apartments.resolvers.js

export default function(Users, Locations) {
  const apartmentsResolvers = {
    Apartments: {
      ...,
      location: apartment => {
        return Locations.find({
          // _id query is performed with a $in operator
          query: { _id: { $in: [apartment.location] } }
        }).then(result => result[0])
      },
      ...
    }
  }

  return apartmentsResolvers
}
```

#### New 'Search' Page, by Location, filter by [size, price, amenities, details, services]

I contemplated between working with existing `apartments` query provided or making a new Search Apartment query. 

Decided against the former because of how inefficient it may be to run filter function on the client side to get the expected search results.

Using the existing `apartments` query in production also means that unrequired data items will be retrieved (and then filtered manually on the client side) alongside with the actual data items wanted by users.

Hence the decision for the latter solution.

> searchApartments query
```javascript
// client/src/queries/apartmentsQueries.js

export const SEARCH_APARTMENTS = gql`
  query SearchApartments(
    $location: String
    $size: Int
    $price: Int
    $amenities: [String]
    $services: [String]
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
      
      # gql does not accept dot notation for object
      
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

// server/src/services/graphql/graphql.resolvers.js

const rootResolvers = {
    Query: {
      searchApartments: (_, args, context) => {
        /*
            query nested object in a document with dot notation key

            ex: to query for apartments with 2 bathrooms & 1 floor

                query: {
                    "details.bathrooms": 2,
                    "details.floor": 1
                }
        */
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
      ...
    }
  }
```

Search filters are pushed to address query string everytime there is a request for search data. Similarly, addresses with query string will be parsed, and search results corresponding to the query will be returned.

Example
> http://localhost:3000/search?locality=507F191e810c19729De860eA&size=71&amenities[0]=fridge&details.rooms=2

Link above will return Apartments in Cologne, with size < 71, with fridge, and 2 rooms.

To-dos, Future Improvements
------
* React component prop validation and default props
    
* Use `apollo-link-state` and and `in-memory-cache` for a central application state management, and possibly removing Redux from the equation

Disclaimer
------
* Current repo is only optimized for the Client Front End part of the assignment
* I've made some necessary bug fixes (documented above) to the server code in order to attempt some of the requirements, otherwise unattemptable
* I'm unsure if the `searchApartments` query that I added is actually allowed for the test, but in my defence it was more logical to do so and more applicable to production environment
* I've made no changes to any `webpack` configuration or `eject` the app because the configurations are already done by `create-react-app` and due to the lack of time

Contact
------
[Linkedin](https://www.linkedin.com/in/shueze/)

[E-mail](mailto:shueze@gmail.com)
