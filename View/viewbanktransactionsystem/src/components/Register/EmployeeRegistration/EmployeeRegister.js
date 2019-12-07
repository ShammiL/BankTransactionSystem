import React, { Component } from 'react'
import { typeDetails, fetchEmployeeRegisteredUser } from '../../../actions/registerAction'
import { connect } from 'react-redux'

class EmployeeRegister extends Component {
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop
    }
    submit = e => {
        e.preventDefault();
        var details = {
            firstName: this.props.firstName[0],
            lastName: this.props.lastName[0],
            nic: this.props.nic[0],
            email: this.props.email[0],
            username: this.props.username[0],
            password: this.props.password[0],
            phoneNumber: this.props.phoneNumber[0],
            buildingNumber: this.props.buildingNumber[0],
            streetName: this.props.streetName[0],
            city: this.props.city[0],
            designation: this.props.designation[0],
            salary: this.props.salary[0],
            branchID: this.props.branchID[0],
            type: this.props.type[0]
        }
        // console.log(details)
        this.props.fetchEmployeeRegisteredUser({ details });
        window.location.assign("http://localhost:3000");

    }
    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <div>
                        <h5>FirstName: </h5>
                        <input onChange={this.change} name="firstName" type="text" placeholder="FirstName" />
                        <h5>LastName: </h5>
                        <input onChange={this.change} name="lastName" type="text" />
                        <h5>NIC: </h5>
                        <input onChange={this.change} name="nic" type="text" />
                    </div>
                    <h5>Email: </h5>
                    <input onChange={this.change} name="email" type="text" />
                    <h5>Username: </h5>
                    <input onChange={this.change} name="username" type="text" />
                    <h5>Password: </h5>
                    <input onChange={this.change} name="password" type="password" />
                    <h5>Phone Number: </h5>
                    <input onChange={this.change} name="phoneNumber" type="text" />
                    <h5>Building Number: </h5>
                    <input onChange={this.change} name="buildingNumber" type="text" />
                    <h5>Street Name: </h5>
                    <input onChange={this.change} name="streetName" type="text" />
                    <h5>City: </h5>
                    <input onChange={this.change} name="city" type="text" />
                    <div>
                        <h5>Designation: </h5>
                        <input type="radio" name="type" value="manager" onChange={this.change} /> Manager
                    </div>
                    <div>
                        <h5>Salary: </h5>
                        <input onChange={this.change} name="salary" type="text" />
                    </div>
                    <div>
                        <h5>Branch: </h5>
                        <input onChange={this.change} name="branchID" type="text" />
                    </div>
                    <button>Register</button>
                </form>
                {/* <div>
                    {this.props.code == 204 ? <p> {this.props.success} </p> : ''}
                </div> */}
            </div >
        )
    }
}

const mapStatesToProps = state => ({
    firstName: state.registerReducer.firstName,
    lastName: state.registerReducer.lastName,
    nic: state.registerReducer.nic,
    email: state.registerReducer.email,
    username: state.registerReducer.username,
    password: state.registerReducer.password,
    buildingNumber: state.registerReducer.buildingNumber,
    streetName: state.registerReducer.streetName,
    city: state.registerReducer.city,
    phoneNumber: state.registerReducer.phoneNumber,
    branchID: state.registerReducer.branchID,
    salary: state.registerReducer.salary,
    designation: state.registerReducer.designation,
    type: state.registerReducer.type

})
const mapActionToProps = {
    typeDetails: typeDetails,
    fetchEmployeeRegisteredUser: fetchEmployeeRegisteredUser
}

export default connect(mapStatesToProps, mapActionToProps)(EmployeeRegister)
