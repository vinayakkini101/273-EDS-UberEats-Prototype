import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import countryList from 'country-list';
import NavBar from '../Navbar/navbar';


class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            profileDetails: {}
        }
    }

    componentDidMount = () => {
        this.getCartItems();
        this.getSavedAddresses();
    }

    getCartItems = () => {
        axios.post('/getCartItems', {
            userEmail: localStorage.getItem('userEmail')
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log("cart array response ", response.data.slice());

                    this.setState({
                        cartItems: response.data.slice(),
                    });
                    
                    console.log('cart array state ',this.state.cartItems);
                }
            })
            .catch(error => {
                console.log("get all cart items error");
                this.setState({
                    // isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get all cart items, please try again!");
            })
    }

    getSavedAddresses = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getCustomerProfile', {
            customerEmail: localStorage.getItem('userEmail') 
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    const details = response.data;
                    this.setState({
                        profileDetails: {
                            name: details.name,
                            email: details.email,
                            contactno: details.contact_number,
                            // about: details.about,
                            // nickname: details.nickname,
                            // dob: details.dob.split('T')[0],
                            country: details.country,
                            state: details.state,
                            city: details.city,
                            imageLink: details.profile_picture 
                        }
                    })
                }
            })
            .catch(error => {
                console.log("get customer details error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get customer details, please try again!");
            })
    }

    render() {
        let authenticate = null;
        if( !cookie.load('cookie')) {
            console.log('hello');
            authenticate = <Redirect to='/login' />;
        }

        if(this.state.cartItems.length === 0) {
            return (
                <>
                {authenticate}
                <NavBar />
                <div className="container">
                    <div className="alert alert-secondary">Cart Empty!</div>
                </div>
                </>
            );
        }

        let totalCost = 0;

        return (
            <>
            {authenticate}
            <NavBar />
            <div className="container">
                Checkout
                <div className="row">
                    <div className="col-8">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Dish Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cartItems.map(item => {
                                    totalCost += parseInt(item.price) * parseInt(item.quantity);
                                    return (
                                        <tr>
                                            <td>{item.dishName}</td>
                                            <td>x{item.quantity}</td>
                                            <td>${item.price}</td>
                                        </tr>
                                    );
                                })}

                                <tr>
                                    <th scope="col">Item Total</th>
                                    <th scope="col"></th>
                                    <th scope="col">${totalCost}</th>
                                </tr>
                            </tbody>
                        </table>

                        <div className="row">
                            Select Address
                            <div className="list-group">
                                <div className="list-group-item">
                                    {/* <input className="form-check-input mb-3" type="checkbox" value=""/>
                                    <p className="mb-1">
                                        {this.state.profileDetails.city}, {this.state.profileDetails.state}, {this.state.profileDetails.country}
                                    </p> */}
                                    <select className="form-select">
                                        <option value="">{this.state.profileDetails.city}, {this.state.profileDetails.state}, {this.state.profileDetails.country}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        - OR -
                        <div className="row">
                            <div className="list-group g-3">
                            Add New Address
                                <div className="list-group-item">
                                    <form>
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input type="text" className="form-control" name="city"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="state" className="form-label">State</label>
                                                <input type="text" className="form-control" name="state"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="country" className="form-label">Country</label>
                                                <select className="form-select" name="country">
                                                    {countryList.getNames().map(name => {
                                                        return <option value={name}>{name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-4">
                        <a className="btn btn-lg btn-success" href="/" 
                            data-bs-toggle="modal" 
                            data-bs-target="#checkoutModal"
                        >
                            Place Order
                        </a>
                    </div>
                </div>
            </div>


            <div className="modal fade" tabIndex="-1" id="checkoutModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Order Placed Successfully</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6 dark">Dish Name</div>
                                <div className="col-3">Price</div>
                                <div className="col-3">Quantity</div>
                                {/* <div className="col-2">Total</div> */}
                            </div>
                            {this.state.cartItems.map(item => {
                                return (
                                    <div className="row">
                                        <div className="col-6">{item.dishName}</div>
                                        <div className="col-3">${item.price}</div>
                                        <div className="col-3">x{item.quantity}</div>
                                        {/* <div className="col-2">${item.quantity * item.price}</div> */}
                                    </div>
                                );
                            })}
                        </div>
                        <p></p>
                        Order will be delivered to:
                        <p>{this.state.profileDetails.city}, {this.state.profileDetails.state}, {this.state.profileDetails.country}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


            </>
        );
    }
}

export default Checkout;