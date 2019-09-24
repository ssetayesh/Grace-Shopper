import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Notifications, {notify} from 'react-notify-toast'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <Notifications />
      {notify.show(`Login Success, welcome ${email}!`)}
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
