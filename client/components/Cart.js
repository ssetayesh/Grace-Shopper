import React from 'react'
import {connect} from 'react-redux'
import {gotCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.id) {
      // code should handle seeing guest's cart
      console.log('guest cart')
    } else {
      this.props.gotCart(this.props.id)
    }
  }

  render() {
    const cart = this.props.cart[0]
    // console.log('this.props in Cart render', this.props)
    return (
      <div>
        <center>
          {cart ? (
            <div className="items-list">
              {cart.items.map(item => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <img src={item.img} className="wand-img" />
                </div>
              ))}
            </div>
          ) : (
            <div>Cart Empty</div>
          )}
        </center>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  id: state.user.id
})

const mapDispatchToProps = dispatch => ({
  gotCart: userId => dispatch(gotCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
