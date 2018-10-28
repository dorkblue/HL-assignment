import React from 'react'

export default class ApartmentAmentityView extends React.Component {
  render() {
    let { apartment, limit } = this.props
    let amentities = []
    apartment.amenities.map((item, index) => {
      if (index < limit) {
        amentities.push(
          <span className="_1h9l4w0vvX6d56ZnJ3NLod" key={item}>
            <i />
            <span>{item}</span>
          </span>
        )
      }
    })
    return amentities
  }
}

ApartmentAmentityView.defaultProps = {
  apartment: {
    amenities: []
  },
  limit: 3
}
