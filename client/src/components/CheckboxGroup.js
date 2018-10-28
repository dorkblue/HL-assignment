import React from 'react'

export default class CheckboxGroup extends React.Component {
  _onChange = ({ target: { value, checked } }) => {
    const checkedHash = this.props.checked.reduce(
      (accu, v) => ({
        ...accu,
        [v]: true
      }),
      {}
    )

    const updated = Object.entries({
      ...checkedHash,
      [value]: checked
    })
      .filter(([, v]) => v)
      .map(([k]) => k)

    return this.props.onChange && this.props.onChange(updated)
  }

  render() {
    const { checked, onChange, options, title } = this.props

    const checkedHash = checked.reduce(
      (accu, v) => ({
        ...accu,
        [v]: true
      }),
      {}
    )

    return (
      <div>
        <span>{title}</span>
        {options.map(option => (
          <div key={option.value}>
            <input
              type="checkbox"
              name={option.value}
              value={option.value}
              checked={checkedHash[option.value] || false}
              onChange={this._onChange}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    )
  }
}

CheckboxGroup.defaultProps = {
  checked: [],
  options: [],
  onChange: null,
  title: 'Checkbox'
}
