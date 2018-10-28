import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import HomeView from './views/HomeView'
import client from './ApolloClient'
import store from './store'
import ApartmentView from './views/ApartmentView'
import ApartmentSearchView from './views/ApartmentSearchView'
import LocationsView from './views/LocationsView'
import ApartmentsByLocation from './views/ApartmentsByLocation'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route
                exact
                strict
                path="/locations/:locationId"
                component={ApartmentsByLocation}
              />
              <Route
                exact
                strict
                path="/apartments/:apartmentId"
                component={ApartmentView}
              />
              <Route exact strict path="/locations" component={LocationsView} />
              <Route exact path="/search" component={ApartmentSearchView} />
              <Route exact path="/" component={HomeView} />
              <Route render={() => <div>Page not found</div>} />
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

export default App
