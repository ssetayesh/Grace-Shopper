import React from 'react'
import {Link} from 'react-router-dom'

const SingleItem = props => {
  console.log('props in single item', props)
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
    </div>
  )
}

export default SingleItem
