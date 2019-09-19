import React from 'react'
import {connect} from 'react-redux'
import {gotCart} from '../store/cart'
import {me} from '../store/user'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.gotCart(2)
  }

  render() {
    const cart = this.props.cart[0]

    return (
      <div>
        <center>
          {cart ? (
            <div className="items-list">
              {cart.items.map(item => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <img src={item.img} />
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
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  gotCart: userId => dispatch(gotCart(userId)),
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
