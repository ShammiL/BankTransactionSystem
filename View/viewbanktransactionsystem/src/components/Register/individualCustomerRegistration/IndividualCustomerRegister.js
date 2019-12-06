import React, { Component } from 'react'
import { typeDetails, fetchRegisteredUser } from '../../../actions/registerAction'
import { connect } from 'react-redux'

class IndividualCustomerRegister extends Component {
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
            companyName: this.props.companyName[0],
            type: this.props.type[0]
        }
        // console.log(details)
        this.props.fetchRegisteredUser({ details });
        window.location.assign("http://localhost:3000");

    }
    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <input type="radio" name="type" value="individual" onChange={this.change} defaultChecked /> Person
                    <input type="radio" name="type" value="company" onChange={this.change} /> Company
                    {this.props.type[0] == "individual" ? <div>
                        <h5>FirstName: </h5>
                        <input onChange={this.change} name="firstName" type="text" placeholder="FirstName" />
                        <h5>LastName: </h5>
                        <input onChange={this.change} name="lastName" type="text" />
                        <h5>NIC: </h5>
                        <input onChange={this.change} name="nic" type="text" />
                    </div> : <div>
                            <h5>Company Name: </h5>
                            <input onChange={this.change} name="companyName" type="text" />
                        </div>
                    }

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
                    <button>Register</button>
                </form>
                {/* <div>
                    {this.props.code == 204 ? <p> {this.props.success} </p> : ''}
                </div> */}
            </div>
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
    companyName: state.registerReducer.companyName,
    type: state.registerReducer.type

})
const mapActionToProps = {
    typeDetails: typeDetails,
    fetchRegisteredUser: fetchRegisteredUser
}

export default connect(mapStatesToProps, mapActionToProps)(IndividualCustomerRegister)
