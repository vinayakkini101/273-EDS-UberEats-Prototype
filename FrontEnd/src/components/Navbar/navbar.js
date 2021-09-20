import React from 'react';
// import {Field} from 'formik';
import cookie from 'react-cookies';

class NavBar extends React.Component {

    handleLogout = () => {
        cookie.remove('cookie', {path: '/'});
        localStorage.removeItem('isRestaurant');
        console.log('localstorage on logout ', localStorage);
        localStorage.clear();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    <a className="nav-link" href="/">Navbar</a>
                    <a className="nav-link" href="/">Navbar</a>
                    {/* <Field className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />  */}
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    <a className="btn btn-outline-danger" href="/" onClick={this.handleLogout}>Logout</a>
                </div>
            </nav>
        );
    }
}

export default NavBar;