import React from 'react'
import {connect} from 'react-redux'
import {gotCart, removedFromCart} from '../store/cart'
import {throws} from 'assert'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   totalPrice: 0.0
    // }
    this.removedFromCart = this.removedFromCart.bind(this)
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

  async removedFromCart(item) {
    this.props.removedFromCart(item)
    //this.props.gotCart(this.props.id)
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
  removedFromCart: itemId => dispatch(removedFromCart(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
