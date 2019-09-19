import React from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'
import SingleItem from './SingleItem'

class AllItems extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getItemsThunk()
  }

  handleAddToCart(id) {
    console.log('id', id)
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
  getItemsThunk: () => dispatch(getItemsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
