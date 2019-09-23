import React from 'react'
import {connect} from 'react-redux'
import {gotCart} from '../store/cart'
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
      this.props.gotCart(this.props.id)
    } else {
      this.props.gotCart(this.props.id)
    }
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

  render() {
    console.log('this.props', this.props.cart)
    const cart = this.props.cart

    return (
      <div>
        <center>
          <h2>Cart</h2>
        </center>
        {cart ? (
          <div className="items-list">
            {cart.map(item => (
              <div key={item.id}>
                <p>
                  {item.name} - ${item.price}
                </p>
                <img src={item.img} className="cart-wand-img" />
                <br />
                <button>Delete {item.name}</button>
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
  gotCart: userId => dispatch(gotCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
