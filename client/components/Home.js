import React from 'react'

const style = {
  position: 'fixed',
  top: 50,
  left: 0,
  'min-width': '100%',
  'min-height': '100%'
}

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <img
          src="https://www.vactualpapers.com/web/wallpapers/beautiful-landscape-high-resolution-4k-wallpaper-42/2560x1440.jpg"
          style={style}
        />
        <div className="centered">
          <center>
            <h1>Wanderers</h1>
            <h2>The first store for wands</h2>
          </center>
        </div>
      </div>
    )
  }
}

export default Home
