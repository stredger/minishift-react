import React from 'react'
import PropTypes from 'prop-types'

import './style'
import './MinesSearch.css'

import withData from './datafetching/DataLoader'
import withToken from './datafetching/Token'

import Input from './input'

const propTypes = {
  token: PropTypes.string,
  prefix: PropTypes.string,
  data: PropTypes.object,
}

const defaultProps = {
  token: null,
  prefix: null,
  data: null,
}

const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'

const ROUTE = 'mines'

function selectTransform(param) {
  return (data) => {
    if (data) {
      return data[param].map(val => val.code)
    }
    return null
  }
}

class MinesCreate extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps
    if (data && data.id && !prevState.isUpdate) {
      // only update the state if we have data passed in and we are not yet
      // doing an update (aka. the values have not already been seen)
      const toUpdate = {
        isUpdate: true,
      }
      Object.assign(toUpdate, data)
      return toUpdate
    }
    return null
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.inputParams = [
      {
        name: 'mineName',
        inputGroup: 1,
        width: 33,
      },
      {
        name: 'alias',
        inputGroup: 1,
        width: 33,
      },
      {
        name: 'mineLocationName',
        inputGroup: 1,
        width: 33,
      },
      {
        name: 'district',
        inputGroup: 2,
        width: 33,
      },
      {
        name: 'mineManager',
        inputGroup: 2,
        width: 33,
      },
      {
        name: 'permitteeCompanyCode',
        type: 'data-select',
        route: 'companies',
        transform: selectTransform('companies'),
        inputGroup: 3,
        width: 20,
      },
      {
        name: 'regionCode',
        type: 'data-select',
        route: 'regions',
        transform: selectTransform('regions'),
        inputGroup: 3,
        width: 20,
      },
      {
        name: 'mineTypeCode',
        type: 'data-select',
        route: 'minetypes',
        transform: selectTransform('mineTypes'),
        inputGroup: 3,
        width: 20,
      },
      {
        name: 'mineStatusCode',
        type: 'data-select',
        route: 'minestatuses',
        transform: selectTransform('mineStatuses'),
        inputGroup: 3,
        width: 20,
      },
      {
        name: 'major',
        type: 'checkbox',
        inputGroup: 4,
      },
      {
        name: 'underInvestigation',
        type: 'checkbox',
        inputGroup: 4,
      },
      {
        name: 'withIssues',
        type: 'checkbox',
        inputGroup: 4,
      },
    ]

    const state = {
      isUpdate: false,
    }
    this.inputParams.forEach((param) => { state[param.name] = '' })

    this.state = state
  }

  onInputChange(param) {
    return value => this.updateState(param, value)
  }

  onSubmit(evt) {
    evt.preventDefault()

    const { token } = this.props

    if (!this.validate() || !token) {
      return
    }

    const url = this.getUrl()
    const data = this.getData()
    const method = this.state.isUpdate ? 'PUT' : 'POST'

    const options = {
      method,
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
      body: JSON.stringify(data),
      mode: 'cors',
    }

    fetch(url, options).then((resp) => {
      if (!resp.ok) {
        throw Error(resp.statusText)
      }
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
  }

  getData() {
    const data = {}
    if (this.state.isUpdate) {
      data.enteredBy = this.props.data.enteredBy
      data.enteredDate = this.props.data.enteredDate
    }
    this.inputParams.forEach((param) => {
      const { name } = param
      const val = this.state[name]
      if (val) {
        data[name] = val
      }
    })
    return data
  }

  getUrl() {
    const updateRoute = this.state.isUpdate ? `/${this.props.data.id}` : ''
    return `${BASE_URL}/${ROUTE}${updateRoute}`
  }

  validate() {
    return true
  }

  updateState(param, value) {
    this.setState({
      [param]: value,
    })
  }

  renderInputs() {
    const inputGroups = []

    this.inputParams.forEach((param) => {
      const {
        name,
        type,
        route,
        transform,
        inputGroup,
        width,
      } = param
      const inputs = inputGroups[inputGroup] || []
      inputs.push((
        <Input
          key={name}
          name={name}
          type={type}
          route={route}
          transform={transform}
          value={this.state[name]}
          onChange={this.onInputChange(name)}
          prefix={this.props.prefix}
          width={width && `${width}%`}
        />
      ))
      inputGroups[inputGroup] = inputs
    })

    return inputGroups.map((group, idx) => (
      <div key={idx} className="input-group form-line form-spacing">
        {group}
      </div>
    ))
  }

  render() {
    const disabled = !this.validate()

    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          {this.renderInputs()}
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={disabled}>
              {this.state.isUpdate ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

MinesCreate.propTypes = propTypes
MinesCreate.defaultProps = defaultProps

export default withToken(withData(MinesCreate))
