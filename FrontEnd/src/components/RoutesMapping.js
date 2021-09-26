import React from 'react';
import {Route} from 'react-router-dom';
import LoginForm from './Login/login.js';
import RestaurantHome from './RestaurantHome/restaurantHome.js';
import CustomerHome from './customerHome.js';
import CustomerSignUp from './Signup/customerSignUp.js';
import CustomerProfile from './CustomerProfile/customerProfile.js';
import EditCustomerProfile from './CustomerProfile/editCustomerProfile.js';
import RestaurantSignUp from './Signup/restaurantSignUp.js';
import RestaurantProfile from './RestaurantProfile/restaurantProfile.js';
import EditRestaurantProfile from './RestaurantProfile/editRestaurantProfile.js'
import Search from './Search/search.js'

class RoutesMapping extends React.Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={LoginForm} />
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/RestaurantHome' component={RestaurantHome} />
                <Route exact path='/CustomerHome' component={CustomerHome} />
                <Route exact path='/CustomerSignUp' component={CustomerSignUp} />
                <Route exact path='/CustomerProfile' component={CustomerProfile} />
                <Route exact path='/EditCustomerProfile' component={EditCustomerProfile} />
                <Route exact path='/RestaurantSignUp' component={RestaurantSignUp} />
                <Route exact path='/RestaurantProfile' component={RestaurantProfile} />
                <Route exact path='/EditRestaurantProfile' component={EditRestaurantProfile} />
                <Route exact path='/Search' component={Search} />
            </div>
        );
    }
}

export default RoutesMapping;