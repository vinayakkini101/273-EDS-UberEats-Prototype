import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: []
        }
    }

    handleLogout = () => {
        cookie.remove('cookie', {path: '/'});
        localStorage.removeItem('isRestaurant');
        console.log('localstorage on logout ', localStorage);
        localStorage.clear();

        // sessionStorage.removeItem('cartItems');
        // sessionStorage.clear();
        // console.log('sessionstorage  ', sessionStorage);
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

    render() {
        let homeLink = null;
        let profileLink = null;
        let searchElement = null;
        if(localStorage.getItem('isRestaurant') === 'true') {
            homeLink = '/RestaurantHome';
            profileLink = '/RestaurantProfile';
        }
        else {
            homeLink = '/CustomerHome';
            profileLink = '/CustomerProfile';
            searchElement = <a className="btn btn-outline-success" href="/Search">Search</a>;
            
        }
        // console.log(localStorage.getItem('isRestaurant'));
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <a className="nav-link active" href={homeLink}>Home</a>
                    <a className="nav-link" href={profileLink}>Profile</a>
                    {/* <Field className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />  */}
                    {searchElement}
                    <a className="nav-link" href="/Cart" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"
                        onClick={this.getCartItems}
                    >
                        Cart
                    </a>
                    <a 
                        className="btn btn-outline-danger" 
                        href="/" 
                        onClick={this.handleLogout}
                    >
                        Logout
                    </a>
                </div>
            </nav>

            <div className="modal fade" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Your Cart</h5>
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a className="btn btn-primary" href="/Checkout">Checkout</a>
                    </div>
                    </div>
                </div>
            </div>
            
            </>
        );
    }
}

export default NavBar;