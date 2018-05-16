import React from 'react'
import PropTypes from 'prop-types'

const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'

const propTypes = {
  token: PropTypes.string,
  route: PropTypes.string,
}

const defaultProps = {
  token: null,
  route: null,
}

function withData(Wrapped) {
  class WithDataHOC extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        data: null,
        error: null,
        loading: false,
      }
    }

    componentDidMount() {
      this.mounted = true
      this.loadData()
    }

    componentDidUpdate(prevProps) {
      if (this.props.token !== prevProps.token ||
          this.props.route !== prevProps.route) {
        this.loadData()
      }
    }

    componentWillUnmount() {
      this.mounted = false
    }

    getUrl() {
      return `${BASE_URL}/${this.props.route}`
    }

    loadData() {
      const { token, route } = this.props

      if (!token || !route) {
        return
      }

      this.setState(() => ({
        loading: true,
        error: null,
        data: null,
      }))

      const options = {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }

      const url = this.getUrl()

      fetch(url, options)
        .then((resp) => {
          if (!this.mounted) {
            return null
          }

          if (!resp.ok) {
            throw Error(resp.statusText)
          }
          return resp.json()
        })
        .then((parsed) => {
          if (this.mounted) {
            this.setState({
              data: parsed,
              loading: false,
            })
          }
        })
        .catch((error) => {
          if (this.mounted) {
            this.setState({
              error,
              loading: false,
            })
          }
        })
    }

    render() {
      return <Wrapped {...this.props} {...this.state} />
    }
  }

  WithDataHOC.propTypes = propTypes
  WithDataHOC.defaultProps = defaultProps

  return WithDataHOC
}

export default withData
