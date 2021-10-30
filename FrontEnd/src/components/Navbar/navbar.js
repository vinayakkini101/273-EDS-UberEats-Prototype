import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Cart from '../Cart/cart.js';
import Orders from '../Orders/orders.js';
import { Redirect } from 'react-router';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            userEmail: localStorage.getItem('userEmail'),
            isLoggedOut: false
        }
    }

    handleLogout = () => {
        // cookie.remove('cookie', {path: '/'})
        const token = localStorage.getItem('token');
        console.log('logged out');
        localStorage.removeItem('isRestaurant');
        localStorage.removeItem('token');
        console.log('localstorage on logout ', localStorage);
        localStorage.clear();

        sessionStorage.removeItem('cartItems');
        sessionStorage.removeItem('userName');
        sessionStorage.clear();
        console.log('sessionstorage  ', sessionStorage);

        axios.defaults.headers.common['Authorization'] = token;
        axios.post('/logout')
            .then((res) => {
                this.setState({
                    isLoggedOut: true
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        let homeLink = null;
        let profileLink = null;
        let searchElement = null;
        let cartLink = null;
        let favouriteLink = null;
    
        let redirect = null;
        if(this.state.isLoggedOut) {
            redirect = <Redirect to='/' />
        }

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
            {redirect}
            
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
                    <button 
                        className="btn btn-outline-danger" 
                        onClick={this.handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>
            </>
        );
    }
}

export default NavBar;