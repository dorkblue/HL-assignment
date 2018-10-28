import React from 'react'
import styled from 'styled-components'
import Overlay from './Overlay'

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      dropdownVisible: false
    }
  }

  render() {
    const { options, value, placeholder, onSelect } = this.props

    const filtered = this.state.value
      ? options.filter(
        option =>
          option.label
            .toLowerCase()
            .indexOf(this.state.value.toLowerCase()) >= 0
      )
      : []

    return (
      <Wrapper>
        <InputWrapper>
          <Input
            onChange={e =>
              this.setState({ value: e.target.value, dropdownVisible: true })
            }
            value={this.state.value}
            placeholder={placeholder}
          />
        </InputWrapper>

        {filtered.length > 0 &&
          this.state.dropdownVisible && (
            <React.Fragment>
              <Ul>
                {filtered.map(option => (
                  <li
                    key={option.value}
                    onClick={() => {
                      this.setState({
                        value: option.label,
                        dropdownVisible: false
                      })
                      return onSelect(option.value)
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </Ul>
              <Overlay
                onClick={() => this.setState({ dropdownVisible: false })}
              />
            </React.Fragment>
          )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
`

const InputWrapper = styled.div`
  background: #f1f1f1;
  padding: 0.5rem;
  border-radius: 5px;
`

const Input = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  padding: 0.25rem;
  font-size: 1em;

  &::placeholder {
    color: #aaa;
  }
`

const Ul = styled.ul`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(calc(100% + 0.5rem));
  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: #fff;
  margin: 0;
  padding: 0;

  border-radius: 4px;
  box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.075);
  overflow-y: auto;

  & > li + li {
    /* margin-top: 0.25rem; */
  }

  li {
    padding: 0.75rem;

    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.075);
    }
  }
`
