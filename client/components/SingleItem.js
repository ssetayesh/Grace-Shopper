import React from 'react'

const SingleItem = props => {
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
          props.handleAddToCart(item.id, item.price)
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default SingleItem
