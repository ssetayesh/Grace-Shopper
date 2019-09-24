import React from 'react'
import {connect} from 'react-redux'
import {
  gotCart,
  removedFromCart,
  checkoutCart,
  changedQuantity
} from '../store/cart'
import {throws} from 'assert'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   totalPrice: 0.0
    // }
    this.removedFromCart = this.removedFromCart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.changedQuantity = this.changedQuantity.bind(this)
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

  changedQuantity(userId, itemId, price, newQuantity) {
    try {
      const newPrice = price * newQuantity
      this.props.changedQuantity(userId, itemId, newPrice, newQuantity)
      this.props.gotCart(this.props.id)
    } catch (err) {
      console.error(err)
    }
  }

  handleClick(totalPrice) {
    try {
      const orderId = this.props.cart[0].orderItems.orderId
      this.props.checkoutCart(orderId, totalPrice)
    } catch (error) {
      console.log('Order could not be submitted!', error)
    }
  }

  render() {
    console.log('this.props', this.props)
    const cart = this.props.cart

    return (
      <div>
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
                  onChange={event =>
                    this.changedQuantity(
                      this.props.id,
                      item.id,
                      item.price,
                      event.target.value
                    )
                  }
                >
                  <option value="1">Qty: 1</option>
                  <option value="2">Qty: 2</option>
                  <option value="3">Qty: 3</option>
                  <option value="4">Qty: 4</option>
                  <option value="5">Qty: 5</option>
                  <option value="6">Qty: 6</option>
                  <option value="6">Qty: 7</option>
                  <option value="7">Qty: 8</option>
                  <option value="8">Qty: 9</option>
                  <option value="9">Qty: 10</option>
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
  removedFromCart: itemId => dispatch(removedFromCart(itemId)),
  checkoutCart: (orderId, totalPrice) =>
    dispatch(checkoutCart(orderId, totalPrice)),
  changedQuantity: (itemId, quantity) =>
    dispatch(changedQuantity(itemId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
