import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import NavBar from './Navbar/navbar';

class CustomerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantList: [],
            userLocation: {
                country: localStorage.getItem('country'),
                state: localStorage.getItem('state'),
                city: localStorage.getItem('city')
            },
            filters: {
                locationFilter: true,
                vegFilter: false,
                nonvegFilter: false,
                veganFilter: false
            }
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
                    
                    this.sortRestaurantByLocation();
                    console.log('resto list state ',this.state.restaurantList);
                    console.log(this.state.userLocation);
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

    handleCheckbox = (event) => {
        const target = event.target;
        const targetName = target.name;
        const targetChecked = target.checked;
        console.log('checkbox event', targetName, ' ', targetChecked);
        this.setState({
            filters: {
                ...this.state.filters,
                [targetName]: targetChecked
            }
        })

        if(targetChecked) {
            switch(targetName) {
                case 'locationFilter':
                    this.sortRestaurantByLocation();
                    break;
                case 'vegFilter':
                    this.filterVegRestaurants();
                    break;
                case 'nonvegFilter':
                    this.filterNonvegRestaurants();
                    break;
                case 'veganFilter':
                    this.filterVeganRestaurants();
                    break;
                default:
            }
        }
        
    }

    sortRestaurantByLocation = () => {
        const originalList = this.state.restaurantList;
        const notClosestList = [];
        const closestList = originalList.filter(restaurant => {
            if(restaurant.City !== this.state.userLocation.city) {
                notClosestList.push(restaurant);
            }
            else {
                return restaurant;
            }
        });
        this.setState({
            restaurantList: closestList.concat(notClosestList)
        });
        console.log('sorted list ', this.state.restaurantList);
    }

    filterVegRestaurants = () => {
        const originalList = this.state.restaurantList;
        const vegList = [];
        // const closestList = originalList.filter(restaurant => {
        //     if(restaurant.)
        // });
        // this.setState({
        //     restaurantList: closestList.concat(notClosestList)
        // });
        console.log('sorted list ', this.state.restaurantList);
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
                                    <input 
                                        type="checkbox" 
                                        name="locationFilter"
                                        checked={this.state.filters.locationFilter}
                                        onChange={this.handleCheckbox}
                                    />By Closest Location<br/>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" href="#">By Type</span>
                                    <input 
                                        type="checkbox" 
                                        name='vegFilter' 
                                        checked={this.state.filters.vegFilter}
                                        onChange={this.handleCheckbox}    
                                    />Veg<br/>
                                    <input 
                                        type="checkbox" 
                                        name='nonvegFilter' 
                                        checked={this.state.filters.nonvegFilter}
                                        onChange={this.handleCheckbox}
                                    />Non-Veg<br/>
                                    <input 
                                        type="checkbox" 
                                        name='veganFilter' 
                                        checked={this.state.filters.veganFilter}
                                        onChange={this.handleCheckbox}
                                    />Vegan
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
                city: this.props.details.City,
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
                    <a href="#" className="btn btn-primary">{this.state.city}</a>
                </div>
            </div>
        );
    }
}



export default CustomerHome;