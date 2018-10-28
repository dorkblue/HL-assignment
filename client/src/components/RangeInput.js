import React from 'react'
import styled from 'styled-components'

const RangeInput = ({
  value,
  onChange,
  label,
  name,
  min = 0,
  max = 100,
  prefixUnit = '',
  postfixUnit = ''
}) => {
  return (
    <Wrapper>
      <Label
        htmlFor={name}
        prefixUnit={prefixUnit}
        postfixUnit={postfixUnit}
        min={min}
        max={max}
        value={value}
      >
        {label}
      </Label>
      <input
        value={value}
        type="range"
        id={name}
        name={name}
        min={min}
        max={max}
        onChange={onChange}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled(
  ({ className, children, min, value, prefixUnit, postfixUnit, ...rest }) => (
    <div className={className}>
      <label {...rest}>
        {children}
        <span>
          {`${prefixUnit}${min}${postfixUnit} - ${prefixUnit}${value}${postfixUnit}`}
        </span>
      </label>
    </div>
  )
)`
  span {
    display: block;
    margin-top: 0.5rem;
  }
`

export default RangeInput
