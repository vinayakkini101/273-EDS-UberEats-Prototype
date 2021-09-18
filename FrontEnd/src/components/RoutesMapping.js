import React from 'react';
import {Route} from 'react-router-dom';
import LoginForm from './Login/login.js';
import RestaurantHome from './restaurantHome.js';

class RoutesMapping extends React.Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={LoginForm} />
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/RestaurantHome' component={RestaurantHome} />
            </div>
        );
    }
}

export default RoutesMapping;