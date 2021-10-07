import {Formik, Form, Field, ErrorMessage} from 'formik';
import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            email: '',
            password: '',
            authFlag: false
        }
    }

    handleLogin = (details) => {
        console.log('inside handleLogin react');
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/login', details)
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response)
                    console.log("isRestaurant ", details);
                    localStorage.setItem("isRestaurant", details.isRestaurant);
                    localStorage.setItem("userName", response.data.name);
                    localStorage.setItem("userEmail", response.data.email);
                    localStorage.setItem("country", response.data.country);
                    localStorage.setItem("state", response.data.state);
                    localStorage.setItem("city", response.data.city);
                    localStorage.setItem("street", response.data.street);
                    sessionStorage.setItem("userName", response.data.name);
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
                alert("User credentials not valid. Please try again!");
            })
    }

    render() {

        let redirectVar = null;
        if (cookie.load('cookie')) {
            console.log('localstore in login render()',localStorage.getItem("isRestaurant"));
            if (localStorage.getItem("isRestaurant") === 'true') {
                redirectVar = <Redirect to="/RestaurantHome" />
            }
            else {
                console.log('hello')
                redirectVar =  <Redirect to="/CustomerHome" />
            }
        }
        else{
            console.log('cookie did not load');
        }

        return (
            <div className="container">
            {redirectVar}
                <div className="col card">
                    <div className="card-body">
                        <h5 className="card-title">Login</h5>

                        <Formik
                            initialValues={{ email: this.state.email, password: this.state.password }}
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
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log('in react submit');
                                if(!values.isRestaurant) {
                                    values.isRestaurant = false;
                                }
                                this.handleLogin(values);
                                setSubmitting(false);
                            }}
                        >

                            {({isSubmitting}) => (
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address *</label>
                                        <Field type="email" className="form-control" name="email" />
                                        <ErrorMessage name="email" component="div" />
                                        {/* <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" required autoFocus /> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password *</label>
                                        <Field type="password" className="form-control" name="password" />
                                        <ErrorMessage name="password" component="div" />
                                        {/* <input type="password" className="form-control" id="password" name="password" placeholder="Password" required /> */}
                                    </div>
                                    <div className="mb-3 form-check">
                                        {/* <label htmlFor="accountType" className="form-check-label"></label> */}
                                        <Field type="checkbox" className="form-check-input" name="isRestaurant"/>
                                         Check the box if you are a Restaurant
                                        {/* <ErrorMessage name="acco" component="div" /> */}
                                        {/* <input type="password" className="form-control" id="password" name="password" placeholder="Password" required /> */}
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <Link to="/CustomerSignUp">New Customer? Sign up here</Link>
                    <Link to="/RestaurantSignUp">New Restaurant? Sign up here</Link>
                </div>
            </div>
        );
    }
}

export default LoginForm;