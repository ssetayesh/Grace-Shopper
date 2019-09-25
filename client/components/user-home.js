import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Notifications, {notify} from 'react-notify-toast'

export const UserHome = props => {
  const {email} = props

  return (
    <div>
      {notify.show(`Logged in using ${email}`, 'success', 2550)}
      <h3>Welcome, {email}</h3>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
