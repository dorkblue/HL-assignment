import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const overlayRoot = document.getElementById('overlay-root')

export default class Overlay extends React.Component {
  constructor(props) {
    super(props)
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    // this.el = document.createElement('div')
  }

  // componentDidMount() {
  //   // Append the element into the DOM on mount. We'll render
  //   // into the modal container element (see the HTML tab).
  //   overlayRoot.appendChild(this.el)
  // }

  // componentWillUnmount() {
  //   // Remove the element from the DOM when we unmount
  //   overlayRoot.removeChild(this.el)
  // }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      // this.props.children,
      <ActualOverlay {...this.props} />,
      // A DOM element
      overlayRoot
    )
  }
}

const ActualOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 900;
  background: rgba(255, 255, 255, 0.5);
`
