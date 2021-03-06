import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  width: PropTypes.string,
  validationError: PropTypes.string,
}

const defaultProps = {
  value: undefined,
  name: '',
  title: null,
  prefix: null,
  disabled: null,
  readOnly: null,
  width: null,
  validationError: null,
}

function onChangeWrapper(wrapped) {
  return evt => wrapped(evt.target.checked)
}

function CheckboxInput(props) {
  const {
    name,
    title,
    value,
    onChange,
    prefix,
    disabled,
    width,
    validationError,
    readOnly,
  } = props

  const inputId = `${prefix || ''}${name}`
  const labelClasses = classnames('control-label', validationError && 'has-error')

  return (
    <label className={labelClasses} htmlFor={inputId} style={{ width }}>
      <input
        id={inputId}
        checked={value}
        onChange={onChangeWrapper(onChange)}
        type="checkbox"
        disabled={disabled || readOnly}
        style={{ marginRight: '3px' }}
      />
      {title || startCase(name)}
    </label>
  )
}

CheckboxInput.propTypes = propTypes
CheckboxInput.defaultProps = defaultProps

export default CheckboxInput
