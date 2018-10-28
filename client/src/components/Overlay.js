import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const overlayRoot = document.getElementById('overlay-root')

export default class Overlay extends React.Component {
  render() {
    return ReactDOM.createPortal(<ActualOverlay {...this.props} />, overlayRoot)
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
