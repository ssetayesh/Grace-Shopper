import React from 'react'
import {connect} from 'react-redux'
import {gotCart, removedFromCart, checkoutCart} from '../store/cart'
import {throws} from 'assert'
import Notifications, {notify} from 'react-notify-toast'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   totalPrice: 0.0
    // }
    this.removedFromCart = this.removedFromCart.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.gotCart(this.props.id)
  }

  totalPrice() {
    console.log('this.props in helper')
    const cart = this.props.cart
    let sum = 0.0

    if (cart.length > 0) {
      cart.forEach(element => {
        sum = sum + Number(element.price)
      })
    }
    return sum
  }

  removedFromCart(item) {
    this.props.removedFromCart(item)
    //this.props.gotCart(this.props.id)
  }

  handleClick(totalPrice) {
    try {
      let orderId
      console.log('this.props', this.props)
      if (!this.props.cart[0].orderItems) {
        orderId = null
      } else {
        orderId = this.props.cart[0].orderItems.orderId
      }
      console.log('orderId', orderId)
      this.props.checkoutCart(orderId, totalPrice)
      notify.show('Checkout Complete! Your order are on its way!', 'success')
    } catch (error) {
      console.log('Order could not be submitted!', error)
    }
  }

  render() {
    console.log('this.props', this.props)
    const cart = this.props.cart

    return (
      <div>
        <Notifications />
        <center>
          <h2>Cart</h2>
        </center>
        {cart ? (
          <div className="items-list">
            {cart.map((item, id) => (
              <div key={id}>
                <p>
                  {item.name} - ${item.price}
                </p>
                <img src={item.img} className="cart-wand-img" />
                <br />
                <button
                  type="reset"
                  onClick={() => this.removedFromCart(item.id)}
                >
                  Remove From Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>Cart Empty</div>
        )}
        <hr />
        <p>TOTAL PRICE: ${this.totalPrice()}</p>
        <button
          type="submit"
          onClick={() => this.handleClick(this.totalPrice())}
        >
          Checkout
        </button>
        <br />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  id: state.user.id
})

const mapDispatchToProps = dispatch => ({
  gotCart: userId => dispatch(gotCart(userId)),
  removedFromCart: itemId => dispatch(removedFromCart(itemId)),
  checkoutCart: (orderId, totalPrice) =>
    dispatch(checkoutCart(orderId, totalPrice))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
