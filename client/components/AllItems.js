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
    // this.handleQuantity = this.handleQuantity.bind(this)
  }

  componentDidMount() {
    // console.log('this.props in CDM allitems', this.props)
    this.props.getItemsThunk()
  }

  handleAddToCart(id, price) {
    // console.log('this.props in add', this)
    this.props.addedToCart(id, price)
  }

  // handleQuantity(event) {
  //   console.log('event', event)
  //   this.setState({
  //     quantity: event.target.value
  //   })
  // }

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
          'err'
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
  addedToCart: (id, price) => dispatch(addedToCart(id, price))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
