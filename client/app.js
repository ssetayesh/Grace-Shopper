import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Notifications, {notify} from 'react-notify-toast'

const App = () => {
  return (
    <div>
      <Notifications />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
