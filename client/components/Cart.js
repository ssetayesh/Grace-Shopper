import React from 'react'
import {connect} from 'react-redux'
import {gotCart, removedFromCart, changedQuantity} from '../store/cart'
import {throws} from 'assert'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   totalPrice: 0.0
    // }
    this.totalPrice = this.totalPrice.bind(this)
    this.removedFromCart = this.removedFromCart.bind(this)
    this.changedQuantity = this.changedQuantity.bind(this)
  }

  componentDidMount() {
    if (!this.props.id) {
      // code should handle seeing guest's cart
      console.log('guest cart')
    } else {
      this.props.gotCart(this.props.id)
    }
  }

  totalPrice() {
    const cart = this.props.cart[0]
    let sum = 0.0

    if (this.props.cart.length > 0) {
      cart.items.forEach(element => {
        sum = sum + Number(element.price)
      })
    }
    return sum
  }

  async removedFromCart(item) {
    await this.props.removedFromCart(item)
    await this.props.gotCart(this.props.id)
  }

  async changedQuantity(itemId, price, newQuantity) {
    try {
      const newPrice = price * newQuantity
      await this.props.changedQuantity(itemId, newPrice, newQuantity)
      await this.props.gotCart(itemId)
    } catch (err) {
      console.error(err)
    }
  }

  totalPrice() {
    const cart = this.props.cart[0]
    let sum = 0.0
    if (this.props.cart.length > 0) {
      cart.items.forEach(element => {
        sum = sum + Number(element.price)
      })
    }
    return sum
  }

  render() {
    const cart = this.props.cart[0]
    return (
      <div>
        <center>
          <h2>Cart</h2>
        </center>
        {cart ? (
          <div className="items-list">
            {cart.items.map(item => (
              <div key={item.id}>
                <p>
                  {item.name} - ${item.price}
                </p>
                <img src={item.img} className="cart-wand-img" />
                <br />
                <select
                  onChange={event =>
                    this.props.changedQuantity(
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
                  value="remove"
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
        <button>Checkout</button>
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
  changedQuantity: (item, price, newQuantity) =>
    dispatch(changedQuantity(item, price, newQuantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
