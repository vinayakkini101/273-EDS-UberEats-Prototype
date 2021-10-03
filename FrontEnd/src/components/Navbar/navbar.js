import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Cart from '../Cart/cart.js';

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

        sessionStorage.removeItem('cartItems');
        sessionStorage.clear();
        console.log('sessionstorage  ', sessionStorage);
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
                    <Cart />
                    <a 
                        className="btn btn-outline-danger" 
                        href="/" 
                        onClick={this.handleLogout}
                    >
                        Logout
                    </a>
                </div>
            </nav>
            </>
        );
    }
}

export default NavBar;