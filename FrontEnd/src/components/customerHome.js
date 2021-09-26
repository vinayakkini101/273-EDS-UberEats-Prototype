import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import NavBar from './Navbar/navbar';

class CustomerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultRestaurantList: [],
            currentRestaurantList: [],
            userLocation: {
                country: localStorage.getItem('country'),
                state: localStorage.getItem('state'),
                city: localStorage.getItem('city')
            },
            selectedFilter: 'location',
            defaultDishList: []
        }
    }

    componentDidMount = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getAllRestaurants')
            .then((response) => {
                if (response.status === 200) {
                    // console.log("response ", response.data);

                    this.setState({
                        defaultRestaurantList: response.data,
                        currentRestaurantList: response.data
                    });
                    
                    this.sortRestaurantByLocation();
                    console.log('resto list state ',this.state.currentRestaurantList);
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

    handleRadioButtons = (event) => {
        const target = event.target;
        const targetValue = target.value;
        const targetChecked = target.checked;
        // console.log('checkbox event', targetValue, ' ', targetChecked);
        this.setState(state => {
            state.selectedFilter = targetValue;
            // console.log('radiobutton event', targetValue, ' ', targetChecked, ' ', this.state.selectedFilter);
            switch(state.selectedFilter) {
                case 'location':
                    console.log('inside switch location');
                    this.sortRestaurantByLocation();
                    break;
                case 'veg':
                    this.filterVegRestaurants();
                    break;
                case 'nonveg':
                    this.filterNonvegRestaurants();
                    break;
                case 'vegan':
                    this.filterVeganRestaurants();
                    break;
                default:
                    this.setDefaultRestaurantOrder();
                    break;
            }
        });
    }

    setDefaultRestaurantOrder = () => {
        this.setState({
            currentRestaurantList: this.state.defaultRestaurantList
        });
        console.log('sorted by default ', this.state.currentRestaurantList);
    }

    sortRestaurantByLocation = () => {
        const defaultList = this.state.defaultRestaurantList;
        const notClosestList = [];
        const closestList = defaultList.filter(restaurant => {
            if(restaurant.City !== this.state.userLocation.city) {
                notClosestList.push(restaurant);
            }
            else {
                return restaurant;
            }
        });
        this.setState({
            currentRestaurantList: closestList.concat(notClosestList)
        });
        console.log('sorted by location ', this.state.currentRestaurantList);
    }

    handleClearFilter = (event) => {
        this.setState({
            selectedFilter: ''
        });
        this.setDefaultRestaurantOrder();
        // event.target.check = false;
        // console.log('sorted list ', event.target.checked);
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
            <div>Customer home</div>
             
            <div className="container-fluid">
                <h1 className="text-primary pt-1">Welcome to UberEats!</h1>
                <div className="row flex-nowrap">
                    <div className="col-2 sidebar">
                        <div className="card card-body p-2">
                            <h4>Filters</h4>
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="location"
                                        checked={this.state.selectedFilter === "location"}
                                        onChange={this.handleRadioButtons}
                                    />By Closest Location<br/>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" href="#">By Type</span>
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="veg"
                                        checked={this.state.selectedFilter === "veg"}
                                        onChange={this.handleRadioButtons}    
                                    />Veg<br/>
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="nonveg"
                                        checked={this.state.selectedFilter === "nonveg"}
                                        onChange={this.handleRadioButtons}
                                    />Non-Veg<br/>
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="vegan"
                                        checked={this.state.selectedFilter === "vegan"}
                                        onChange={this.handleRadioButtons}
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
                            <button 
                                className='btn btn-sm btn-outline-danger'
                                onClick={this.handleClearFilter}
                            >
                                Clear All Filters
                            </button>
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
                            {this.state.currentRestaurantList.map(restaurant => {
                                return <Restaurant 
                                            key={restaurant.Display_Picture} 
                                            details={restaurant}   
                                        />;
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