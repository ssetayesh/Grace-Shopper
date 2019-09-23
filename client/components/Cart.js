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
  }

  componentDidMount() {
    if (!this.props.id) {
      // code should handle seeing guest's cart
      console.log('guest cart')
    } else {
      this.props.gotCart(this.props.id)
    }
  }

  async removedFromCart(item) {
    await this.props.removedFromCart(item)
    await this.props.gotCart(this.props.id)
  }

  render() {
    const cart = this.props.cart[0]

    let sum = 0.0
    if (this.props.cart.length > 0) {
      this.props.cart[0].items.forEach(element => {
        sum = sum + Number(element.price)
      })
    }

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
        <p>TOTAL PRICE: ${sum}</p>
        <button>Checkout</button>
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
