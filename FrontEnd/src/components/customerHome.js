import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import NavBar from './Navbar/navbar';

class CustomerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantList: []
        }
    }

    componentDidMount = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getAllRestaurants')
            .then((response) => {
                if (response.status === 200) {
                    // console.log("response ", response.data);

                    this.setState({
                        restaurantList: response.data
                    })
                    
                    console.log('resto list state ',this.state.restaurantList);
                }
            })
            .catch(error => {
                console.log("get all restaurants details error");
                this.setState({
                    // isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get all restaurants details, please try again!");
            })
    }

    render() {
        let authenticate = null;
        if( !cookie.load('cookie')) {
            console.log('hello');
            authenticate = <Redirect to='/login' />;
        }

        return (
            <>
            <NavBar />
            {authenticate}
            <div>CUstomer home</div>
             
            <div className="container-fluid">
                <h1 className="text-primary pt-1">Welcome to UberEats!</h1>
                <div className="row flex-nowrap">
                    <div className="col-2 sidebar">
                        <div className="card card-body p-2">
                            <h4>Filters</h4>
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Active</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Another link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#">Disabled</a>
                                </li>
                            </ul>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Another link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md col-12 main pa-1">
                        <h2>Restaurants</h2>
                        <p>This column is fluid width.</p>

                        <div className="row">
                            {/* <div className="col-lg-3 col-md-6 col-12">
                                <div className="card card-body">
                                    <h2 className="text-center"><span className="label label-danger">Snippets</span></h2>
                                    <h1 className="text-center">311</h1>
                                </div>
                            </div> */}
                            {this.state.restaurantList.map(restaurant => {
                                return <Restaurant key={restaurant.Display_Picture} details={restaurant} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}



class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                id: this.props.details.id,
                name: this.props.details.name,
                description: this.props.details.description,
                email: this.props.details.email,
                contactno: this.props.details.contactno,
                starttime: this.props.details.starttime,
                endtime: this.props.details.endtime,
                country: this.props.details.country,
                state: this.props.details.state,
                city: this.props.details.city,
                imageLink: this.props.details.Display_Picture,
                imageName: this.props.details.imageName
        }
    }

    render() {
        return (
            <div className="card col-lg-3 col-md-6 col-12" style={{width: '3rem;'}}>
                <img src={this.state.imageLink} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.name}</h5>
                    <p className="card-text">{this.state.description}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        );
    }
}



export default CustomerHome;