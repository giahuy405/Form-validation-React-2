import React, { Component } from 'react';
import { connect } from "react-redux"
import { actionSearchUser } from '../redux/actions/userAction';
class SearchUser extends Component {
    state = {
        searchTerm: "",
    }
    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }
    handleSearch = () => {
        this.props.dispatch(actionSearchUser(this.state.searchTerm))
    }
    render() {
        return (
            <div className='d-flex my-2'>
                <input placeholder='Tìm kiếm theo mã' type="text" className='form-control w-25  ' value={this.state.searchTerm} onChange={this.handleChange} />
                <button
                    onClick={() => this.handleSearch()}
                    className="btn btn-success ms-2">Tìm kiếm</button>
            </div>
        );
    }
}

export default connect()(SearchUser)
