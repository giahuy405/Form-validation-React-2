import React, { Component } from 'react'
import Form from './Form'
import List from './List'
import {connect} from "react-redux"
import { actionFetchUser } from '../redux/actions/userAction'
class Home extends Component {
  render() {
    return (
      <div className='container'>
        <Form/>
        <List/>
      </div>
    )
  }
  componentDidMount() {
    this.props.dispatch(actionFetchUser())
}
}
export default connect()(Home)
