import React from 'react'
import {Link} from 'react-router-dom'

const SingleItem = props => {
  console.log('props in SingleItem', props)
  const item = props.item
  return (
    <div className="single-wand">
      <h2>{item.name}</h2>
      <img src={item.img} className="wand-img" />
      <h3>${item.price}</h3>
      <h4>{item.description}</h4>
      <button
        type="button"
        onClick={() => {
          props.handleAddToCart(item.id)
        }}
      >
        Add to Cart
      </button>
      <form onSubmit={props.handleAddToCart}>
        <label htmlFor="quantity">
          Quantity
          <input
            type="text"
            name="quantity"
            value={props.quantity}
            onChange={props.handleQuantity}
          />
        </label>
      </form>
    </div>
  )
}

export default SingleItem
