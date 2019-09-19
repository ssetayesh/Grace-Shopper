import React from 'react'
import {connect} from 'react-redux'
import {gotCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   // userId = this.user.id || 'guest'
  //   this.props.gotCart(1)
  // }

  render() {
    console.log('this', this)
    console.log('this.props', this.props)
    return (
      <div>
        Hello world
        {this.props.cart}
        {/* <center>
        {this.props.cart ?
          <div className="items-list">
            {this.props.cart.map(item => (
              <div key={item.id}>
                <p>{item.name}</p>
                <img src={item.img} />
              </div>
            ))}
          </div>
         :
          <div>Cart Empty</div>
       }
      </center> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  gotCart: userId => dispatch(gotCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
