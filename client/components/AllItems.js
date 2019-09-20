import React from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'
import {addedToCart} from '../store/cart'
import SingleItem from './SingleItem'

class AllItems extends React.Component {
  constructor(props) {
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    // console.log('this.props in CDM allitems', this.props)
    this.props.getItemsThunk()
  }

  handleAddToCart(id) {
    // console.log('this.props in add', this)
    this.props.addedToCart(id)
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
                handleAddToCart={this.handleAddToCart}
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
  addedToCart: id => dispatch(addedToCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
