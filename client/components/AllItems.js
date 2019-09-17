import React from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'

class AllItems extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log('this.props', this.props)
    this.props.getItemsThunk()
    console.log('this.props hello', this.props)
  }
  render() {
    console.log('This.prop in renders....', this.props)
    return (
      <div>
        <center>
          {this.props.items ? (
            <div className="items-list">
              {this.props.items.map(item => (
                <div>
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

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => ({
  getItemsThunk: () => dispatch(getItemsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
