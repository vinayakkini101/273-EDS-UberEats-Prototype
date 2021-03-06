import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Cart from '../Cart/cart.js';
import Orders from '../Orders/orders.js';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            userEmail: localStorage.getItem('userEmail')
        }
    }

    handleLogout = () => {
        cookie.remove('cookie', {path: '/'});
        localStorage.removeItem('isRestaurant');
        console.log('localstorage on logout ', localStorage);
        localStorage.clear();

        sessionStorage.removeItem('cartItems');
        sessionStorage.removeItem('userName');
        sessionStorage.clear();
        console.log('sessionstorage  ', sessionStorage);
    }

    render() {
        let homeLink = null;
        let profileLink = null;
        let searchElement = null;
        let cartLink = null;
        let favouriteLink = null;
    
        if(localStorage.getItem('isRestaurant') === 'true') {
            homeLink = '/RestaurantHome';
            profileLink = `/RestaurantProfile/${this.state.userEmail}`;
        }
        else {
            homeLink = '/CustomerHome';
            profileLink = `/CustomerProfile/${this.state.userEmail}`;
            searchElement = <a className="nav-link fs-5 fw-bold" href="/Search">Search</a>;
            cartLink = <Cart />;
            favouriteLink = <a className="nav-link fs-5 fw-bold" href="/Favourites">Favourites</a>;
        }
        // console.log(localStorage.getItem('isRestaurant'));
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold fs-1" href="/">UberEats</a>
                    <a className="nav-link fs-5 fw-bold" href={homeLink}>Home</a>
                    <a className="nav-link fs-5 fw-bold" href={profileLink}>Profile</a>
                    {/* <Field className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />  */}
                    {searchElement}
                    {favouriteLink}
                    <a className="nav-link fs-5 fw-bold" href="/Orders">Orders</a>
                    {cartLink}
                    Hi, {sessionStorage.getItem('userName')}!
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