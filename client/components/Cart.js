import React from 'react'
import {connect} from 'react-redux'
import {gotCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.gotCart()
  }

  render() {
    return (
      <div>
        <center>
          {this.props.items ? (
            <div className="items-list">
              {this.props.cart.map(item => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <img src={item.img} />
                </div>
              ))}
            </div>
          ) : (
            'err'
          )}
        </center>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state
})

const mapDispatchToProps = dispatch => ({
  gotCart: () => dispatch(gotCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
