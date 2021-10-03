import React from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import countryList from 'country-list';
// import {Link} from 'react-router-dom';

class CustomerSignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            authFlag: false
        }
    }

    handleSignUp = (details) => {
        console.log('inside handleSignUp react');
        console.log(details);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/signup', details)
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response)
                    // console.log("isRestaurant ", details);
                    // localStorage.setItem("isRestaurant", details.isRestaurant);
                    // localStorage.setItem("userName", response.data.name);
                    // localStorage.setItem("userEmail", response.data.email);
                    this.setState({
                        authFlag: true
                    })
                }
            })
            .catch(error => {
                console.log("In error");
                this.setState({
                    authFlag: "false"
                });
                console.log(error);
                alert("Account not created. Please try again!");
            })
    }

    render() {
        let signupMessage;
        if(this.state.authFlag) {
            signupMessage = (
                <>
                <div className="alert alert-success" role="alert">
                    Signup Successful!
                </div>
                </>
                );
        }

        return (
            <div className="row vh-100 align-items-center justify-content-center">

            {signupMessage}

                <div className="col card" style={{width: '30rem', height: '55rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">Customer Sign Up</h5>

                        <Formik
                            initialValues={
                                { 
                                    email: '', 
                                    password: '',
                                    name: '',
                                    contactno: '',
                                    about: '',
                                    nickname: '',
                                    endtime: '',
                                    country: '',
                                    state: '',
                                    city: '',
                                    street: ''
                                }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Required!';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }

                                if( !values.password) {
                                    errors.password = 'Required!';
                                }
                                else if(values.password.length < 6) {
                                    errors.password = 'Password must have more than 5 characters!';
                                }

                                if(values.contactno.length < 10 || values.contactno.length > 10) {
                                    errors.contactno = 'Contact must be exactly 10 digits';
                                }
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                console.log('in react submit');
                                values.isRestaurant = false;
                                this.handleSignUp(values);
                                setSubmitting(false);
                            }}
                        >

                        {({
                            values, 
                            handleChange,
                            handleBlur
                        }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="name">Name *</label>
                                    <Field type="text" name="name" className="form-control" id="name" placeholder="Name" required />
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="email">Email address *</label>
                                    <Field type="email" name="email" className="form-control" id="email" placeholder="Email" required />
                                    <ErrorMessage name="email" component="div" />
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="contactno">Contact No. *</label>
                                    <Field type="tel" name="contactno" className="form-control" id="contactno" placeholder="Contact No." pattern="[0-9]{10,10}"  required title="Contact Number having 10 digits" />
                                    <ErrorMessage name="contactno" component="div" />
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="about">About</label>
                                    <Field type="text" name="about" className="form-control" id="about" placeholder="About" required />
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="nickname" className="form-label">Nickname</label>
                                    <Field type="text" name="nickname" className="form-control" id="nickname" placeholder="Nickname" required />
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="dob">Date Of Birth</label>
                                    <Field type="date" name="dob" className="form-control" id="dob" placeholder="Date Of Births" required />
                                </div>
                                {/* <div  className="mb-3">
                                    <label htmlFor="profilepic" className="form-label">Upload Your Picture</label>
                                    <Field type="file" name="profilepic" className="form-control" id="profilepic" accept="image/*required" />
                                </div> */}
                                <div  className="mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select 
                                        id="country" 
                                        name="country" 
                                        className="form-select"
                                        onChange={handleChange}    
                                    >
                                        {countryList.getNames().map(name => {
                                            return <option value={name}>{name}</option>
                                        })}
                                    </select>
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="state">State</label>
                                    <Field type="text" name="state" className="form-control" id="state" placeholder="State" required />
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="city">City</label>
                                    <Field type="text" name="city" className="form-control" id="city" placeholder="City" required />
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="street">Street Address</label>
                                    <Field type="text" name="street" className="form-control" id="street" placeholder="Street Address" required />
                                </div>
                                <div  className="mb-3">
                                    <label htmlFor="password">Password *</label>
                                    <Field type="password" name="password" className="form-control" id="password" placeholder="Password" required />
                                    <ErrorMessage name="password" component="div" />
                                </div>
                                {/* <Link to="/CustomerSignUp"> */}
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                {/* </Link> */}
                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerSignUp;