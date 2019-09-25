import React from 'react'
import {connect} from 'react-redux'
import {
  gotCart,
  removedFromCart,
  checkoutCart,
  changedQuantity
} from '../store/cart'
import {throws} from 'assert'
import Notifications, {notify} from 'react-notify-toast' //**npm install this

class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   totalPrice: 0.0
    // }
    this.removedFromCart = this.removedFromCart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.totalQuantity = this.totalQuantity.bind(this)
  }

  componentDidMount() {
    this.props.gotCart(this.props.id)
  }

  totalPrice() {
    const cart = this.props.cart
    let sum = 0.0

    if (cart.length > 0) {
      cart.forEach(element => {
        sum = sum + Number(element.price)
      })
    }
    return sum
  }

  totalQuantity(itemId, quantity, price) {
    const cart = this.props.cart
    console.log('cart in totalQuantitiy and id', cart, itemId)
    let orderId

    if (!this.props.cart[0].orderItems) {
      orderId = null
    } else {
      orderId = this.props.cart[0].orderItems.orderId
    }

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === itemId) {
        this.props.changedQuantity(itemId, price * quantity, quantity, orderId)
      }
    }
  }

  removedFromCart(item) {
    let orderId

    if (!this.props.cart[0].orderItems) {
      orderId = null
    } else {
      orderId = this.props.cart[0].orderItems.orderId
    }
    // console.log('in remove Cds', this.props)
    this.props.removedFromCart(item, orderId)
  }

  handleClick(totalPrice) {
    try {
      let orderId

      if (!this.props.cart[0].orderItems) {
        orderId = null
      } else {
        orderId = this.props.cart[0].orderItems.orderId
      }

      this.props.checkoutCart(orderId, totalPrice)
      notify.show('Checkout Complete! Your orders are on its way!', 'success')
    } catch (error) {
      console.log('Order could not be submitted!', error)
    }
  }

  render() {
    console.log('this.props in render', this.props)
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
                <select
                  onChange={() =>
                    this.totalQuantity(item.id, event.target.value, item.price)
                  }
                >
                  <option value="1">Qty: 1</option>
                  <option value="2">Qty: 2</option>
                  <option value="3">Qty: 3</option>
                  <option value="4">Qty: 4</option>
                  <option value="5">Qty: 5</option>
                  <option value="6">Qty: 6</option>
                  <option value="7">Qty: 7</option>
                  <option value="8">Qty: 8</option>
                  <option value="9">Qty: 9</option>
                  <option value="10">Qty: 10</option>
                </select>
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
  removedFromCart: (itemId, orderId) =>
    dispatch(removedFromCart(itemId, orderId)),
  changedQuantity: (itemId, newPrice, quantity, orderId) =>
    dispatch(changedQuantity(itemId, newPrice, quantity, orderId)),
  checkoutCart: (orderId, totalPrice) =>
    dispatch(checkoutCart(orderId, totalPrice))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
