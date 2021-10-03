import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import NavBar from './Navbar/navbar';
import { Link } from 'react-router-dom';

class CustomerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultRestaurantList: [],
            currentRestaurantList: [],
            userLocation: {
                country: localStorage.getItem('country'),
                state: localStorage.getItem('state'),
                city: localStorage.getItem('city'),
                street: localStorage.getItem('street')
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
                case 'nonveg':
                case 'vegan':
                    this.filterRestaurantsByFoodType();
                    break;
                case 'pickup':
                    this.filterRestaurantsByPickup();
                    break;
                case 'delivery':
                    this.filterRestaurantsByDelivery();
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
            if(restaurant.city !== this.state.userLocation.city) {
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

    filterRestaurantsByFoodType = () => {
        const defaultList = this.state.defaultRestaurantList;
        const foodType = this.state.selectedFilter;
        const vegList = defaultList.filter(restaurant => {
            switch(foodType) {
                case 'veg':
                    return restaurant.veg;
                case 'nonveg':
                    return restaurant.nonveg;
                case 'vegan':
                    return restaurant.vegan;
                default:
                    return null;
            }
        });
        this.setState({
            currentRestaurantList: vegList
        });
        console.log(`filtered by veg ${foodType}`, this.state.currentRestaurantList);
    }

    filterRestaurantsByPickup = () => {
        const defaultList = this.state.defaultRestaurantList;
        const pickupList = defaultList.filter(restaurant =>  restaurant.pickup === 1 );
        this.setState({
            currentRestaurantList: pickupList
        });
        console.log(`filtered by pickup`, this.state.currentRestaurantList);
    }

    filterRestaurantsByDelivery = () => {
        const defaultList = this.state.defaultRestaurantList;
        const deliveryList = defaultList.filter(restaurant =>  restaurant.delivery === 1 );
        this.setState({
            currentRestaurantList: deliveryList
        });
        console.log(`filtered by delivery`, this.state.currentRestaurantList);
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
                                    />By Nearest Location<br/>
                                </li>
                                <li className="nav-item mb-4">
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="veg"
                                        checked={this.state.selectedFilter === "veg"}
                                        onChange={this.handleRadioButtons}
                                        className="mb-2"
                                    />Veg<br/>
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="nonveg"
                                        checked={this.state.selectedFilter === "nonveg"}
                                        onChange={this.handleRadioButtons}
                                        className="mb-2"
                                    />Non-Veg<br/>
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="vegan"
                                        checked={this.state.selectedFilter === "vegan"}
                                        onChange={this.handleRadioButtons}
                                        className="mb-2"
                                    />Vegan<br/>
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="pickup"
                                        checked={this.state.selectedFilter === "pickup"}
                                        onChange={this.handleRadioButtons}
                                        className="mb-2"
                                    />Pickup<br/>
                                    <input 
                                        type="radio" 
                                        name="filter"
                                        value="delivery"
                                        checked={this.state.selectedFilter === "delivery"}
                                        onChange={this.handleRadioButtons}
                                    />Delivery
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
                                return <RestaurantDisplayCard
                                            key={restaurant.Restaurant_ID} 
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



class RestaurantDisplayCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                id: this.props.details.Restaurant_ID,
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
                imageName: this.props.details.imageName,
                street: this.props.details.street
        }
    }

    render() {
        return (
                <div className="card col-lg-3 col-md-6 col-12" style={{width: '3rem;'}}>
                    <Link to={`/Restaurant/${this.state.name}`} >
                        <img src={this.state.imageLink} className="card-img-top" alt="..."/>
                    </Link>
                        <div className="card-body">
                            <Link 
                                to={{
                                    pathname: `/Restaurant/${this.state.email}`,
                                    // details: this.props.details
                                }}
                            >
                                <h5 className="card-title">{this.state.name}</h5>
                            </Link>
                            <p className="card-text">{this.state.description}</p>
                            <a href="" className="btn btn-primary">{this.state.city}</a>
                        </div>
                </div>
        );
    }
}



export default CustomerHome;