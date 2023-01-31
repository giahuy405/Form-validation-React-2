import React, { Component } from 'react'
import { connect } from "react-redux"
import { actionDeleteUser, actionFetchUser, actionSelectUser } from '../redux/actions/userAction'


class List extends Component {
    handleDelete = id => {
        this.props.dispatch(actionDeleteUser(id))
    }
    handleSelect = id => {
        this.props.dispatch(actionSelectUser(id))
    }
    renderTable = () => {
        const { users, isLoading, error } = this.props;
        if (isLoading) {
            return <div class="spinner-border " style={{position:"absolute",left:"50%",marginTop:"20px"}} role="status">
                <span class="visually-hidden ">Loading...</span>
            </div>
        }
        if (error) {
            return <h2 >{error}</h2>
        }
        return users.map(item =>
            <tr key={item.id}>
                <td>{item.idStudent}</td>
                <td>{item.fullname}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                    <button
                        onClick={() => this.handleSelect(item.id)}
                        className="btn btn-primary">Chỉnh sửa</button>
                    <button
                        onClick={() => this.handleDelete(item.id)}
                        className="btn btn-danger ms-2">Xóa</button>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Họ tên</th>
                            <th>Sdth</th>
                            <th>Email</th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }

}
export default connect(state => ({
    users: state.userReducer.users,
    isLoading: state.userReducer.isLoading,
    error: state.userReducer.error,

}))(List)