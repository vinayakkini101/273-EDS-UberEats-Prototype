import React from 'react';
import {Route} from 'react-router-dom';
import LoginForm from './Login/login.js';
import RestaurantHome from './restaurantHome.js';
import CustomerHome from './customerHome.js';
import CustomerSignUp from './Signup/customerSignUp.js';
import RestaurantSignUp from './Signup/restaurantSignUp.js';

class RoutesMapping extends React.Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={LoginForm} />
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/RestaurantHome' component={RestaurantHome} />
                <Route exact path='/CustomerHome' component={CustomerHome} />
                <Route exact path='/CustomerSignUp' component={CustomerSignUp} />
                <Route exact path='/RestaurantSignUp' component={RestaurantSignUp} />
            </div>
        );
    }
}

export default RoutesMapping;