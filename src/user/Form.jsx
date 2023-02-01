import React, { Component } from 'react'
import { connect } from "react-redux"
import { actionCreateUser, actionUpdateUser } from '../redux/actions/userAction';
class Form extends Component {
    state = {
        values: {
            idStudent: "",
            fullname: "",
            phone: "",
            email: "",
        },
        errors: {
            idStudent: "",
            fullname: "",
            phone: "",
            email: "",
        },
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        })
    }
    handleBlur = e => {
        const { name, value } = e.target;
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: this.validation(name, value)
            }
        })
    }
    handleSubmit = async e => {
        e.preventDefault();
        // kiểm tra validation
        const { values } = this.state;
        const validationErrors = {};
        for (let key in values) {
            const error = this.validation(key, values[key]);
            if (error) validationErrors[key] = error
        }
        if (Object.keys(validationErrors).length > 0) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    ...validationErrors
                }
            })
            return
        }
        const { id, ...payload } = this.state.values;

        try {
            if (id) {
                this.props.dispatch(actionUpdateUser(payload, id))
            } else {
                this.props.dispatch(actionCreateUser(payload))
            }
        } catch (err) {
            console.log(err)
        }
        // làm rỗng input
        this.setState({
            values: {
                idStudent: "",
                fullname: "",
                phone: "",
                email: "",
            },
        })
    }
    validation = (name, value) => {
        switch (name) {
            case "idStudent": {
                if (!value.trim()) return "Mã sinh viên k dc bỏ trống";
                if(!/[0-9]{3,5}/g.test(value)) return "Mã sinh viên là số từ 3-5 kí tự"
                return ""
            }
            case "fullname": {
                if (!value.trim()) return "Tên sinh viên không dc bỏ trống";
                if (!/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/.test(value)) return "Tên phải viết hoa chữ cái đầu và có 2 từ trở lên"
                return ""
            }
            case "phone": {
                if (!value.trim()) return "Sdth không dc bỏ trống";
                if(!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value)) return "Số điện thoại không hợp lệ"
                return ""
            }
            case "email": {
                if (!value.trim()) return "Email k dc bỏ trống";
                if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)) return "Email không đúng định dạng"
                return ""
            }
            default: return ""
        }
    }
    render() {
        const { values, errors } = this.state;
        return (
            <div className='card mt-3'>
                <div className="card-header">
                    <h3>Thông tin sinh viên</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} action="">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <span>Mã</span>
                                <input type="text" className="form-control" onChange={this.handleChange} name='idStudent' value={values.idStudent} onBlur={this.handleBlur} />
                                {errors.idStudent && <span className='text-danger'>{errors.idStudent}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Họ tên</span>
                                <input type="text" className="form-control" onChange={this.handleChange} name='fullname' value={values.fullname} onBlur={this.handleBlur} />
                                {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Sdth</span>
                                <input type="text" className="form-control" onChange={this.handleChange} name='phone' value={values.phone} onBlur={this.handleBlur} />
                                {errors.phone && <span className='text-danger'>{errors.phone}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Email</span>
                                <input type="text" className="form-control" onChange={this.handleChange} name='email' value={values.email} onBlur={this.handleBlur} />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                        </div>
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    // Khi props hoặc state thay đổi, component sẽ re-render và chạy vào lifecycle componentDidUpdate
    componentDidUpdate(preProps) {
        // Kiểm tra nếu prop user bị thay đổi, dùng giá trị của prop đó để set lại cho state values
        if (this.props.selectUser && this.props.selectUser !== preProps.selectUser) {
            this.setState({
                values: this.props.selectUser
            })
        }
    }


}
export default connect(state => ({
    selectUser: state.userReducer.selectUser,
}))(Form)