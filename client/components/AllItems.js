import React from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'
import {addedToCart} from '../store/cart'
import SingleItem from './SingleItem'

class AllItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.getItemsThunk()
  }

  handleAddToCart(id, price) {
    this.props.addedToCart(id, price, 1)
  }

  render() {
    return (
      <div>
        {this.props.items ? (
          <div className="wands-list">
            {this.props.items.map(item => (
              <SingleItem
                key={item.id}
                item={item}
                quantity={this.state.quantity}
                handleAddToCart={this.handleAddToCart}
                handleQuantity={this.handleQuantity}
              />
            ))}
          </div>
        ) : (
          'error'
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => ({
  getItemsThunk: () => dispatch(getItemsThunk()),
  addedToCart: (id, price) => dispatch(addedToCart(id, price, 1))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
