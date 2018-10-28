import React from 'react'
import styled from 'styled-components'
import Overlay from './Overlay'

class SearchFilter extends React.Component {
  state = {
    isDropdownVisible: false
  }

  _onDropdownVisible = () => {
    this.setState({ isDropdownVisible: !this.state.isDropdownVisible })
  }

  _onConfirm = () => {
    this.props.onConfirm && this.props.onConfirm()
    return this._onDropdownVisible()
  }

  _onCancel = () => {
    this.props.onCancel && this.props.onCancel()
    return this._onDropdownVisible()
  }

  render() {
    const { props, state } = this

    return (
      <Wrapper>
        <Header onClick={this._onCancel}>
          <div>{this.props.title}</div>
        </Header>
        {state.isDropdownVisible && <Overlay onClick={this._onCancel} />}
        <Dropdown visible={state.isDropdownVisible}>
          <Content>{this.props.children}</Content>
          <Footer>
            {props.extras}
            <Cancel onClick={this._onCancel}>Cancel</Cancel>
            <Confirm onClick={this._onConfirm}>Confirm</Confirm>
          </Footer>
        </Dropdown>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: inline-block;
`

const Header = styled.div`
  max-height: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
`

const Dropdown = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  align-content: stretch;
  position: absolute;
  bottom: 0;
  transform: translateY(100%);

  background: #fff;
  min-height: 150px;
  min-width: 300px;
  /* width: 100%; */
  border-radius: 4px;
  box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.075);
  overflow-y: auto;
  z-index: 999;
`

const Content = styled.div`
  flex: 1 0 auto;
  padding: 1rem;
`

const Footer = styled.div`
  padding: 1rem;
  flex: 0 0 auto;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > button + button {
    margin-left: 0.5rem;
  }
`

const Button = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;
`

const Cancel = styled(Button)`
  background: transparent;
  color: #888;
`

const Confirm = styled(Button)`
  background: hsl(200, 71%, 46%);
  border: 2px solid hsl(200, 71%, 46%);
  color: #fff;
`

export default SearchFilter
