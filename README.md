**Bambu** - OHCL Chart
=====

Try the app out [here](https://ohclchart-shueze.surge.sh)

---

Getting Started
------
1. Invest some time to refactor the current code and make it better
    - please also tell us what you did
2. Add webpack
3. Add information about owner to apartment view page
4. Add new page "Locations", show the apartments filtered by location
5. Add new page "search page", provide abilities to search by location and filter by [size, price, amenities, details, services]

---

Development Stage
------

#### Keypoints for Development
* Single Page Application
* Chart drawn without any helper library
* User selected stock should remain after refreshing page
* Chart should display all period of loaded data
* No boilerplate & scaffolding

#### Graph & Chart
Based on the requirements, I immediately recognized the need to *draw* the chart with SVG, and proceeded to kickstart the development by setting up a `React` app using [Create-React-App](https://github.com/facebook/create-react-app).

A skeleton React component was set up with a list of the provided symbols, that triggers an `onClick` event when clicked to make the API call to [Alpha Vantage's API](https://www.alphavantage.co/).

The received data is then normalized, set to component `state`, and used to *draw* the chart.

I broke down the chart to multiple components, to make them reusable and easier to maintain.

Once I've gotten the basic chart to work, I then implement `Redux` for state management.

I've also implemented `React-Router`'s `Link` component to push query to the address bar, and removed `onClick` from symbols list.

#### Symbols List & Search
I initially planned to use [IEX's API](https://api.iextrading.com/1.0/ref-data/symbols) to get all symbols and list them in a scrollable list with a search filter, but scraped that because the API returns a whopping 8000 item for results with no option for pagination. The load time was taking too long as well.

I eventually settled down with a list of default symbols, with a search that returns best-matching symbols based on the search term. If available, search results will populate the list of symbols.


Contact
------
[Linkedin](https://www.linkedin.com/in/shueze/)

[E-mail](mailto:shueze@gmail.com)
