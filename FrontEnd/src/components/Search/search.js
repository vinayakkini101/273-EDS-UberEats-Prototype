import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import NavBar from '../Navbar/navbar';
import SearchResult from './searchResult';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultRestaurantList: [],
            defaultDishList: [],
            currentSearchResult: [],
            userLocation: {
                country: localStorage.getItem('country'),
                state: localStorage.getItem('state'),
                city: localStorage.getItem('city')
            },
            selectedFilter: 'dishname',
            searchText: ''
        }
    }

    componentDidMount = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getAllRestaurants')
            .then((response) => {
                if (response.status === 200) {
                    // console.log("response ", response.data);

                    this.setState({
                        defaultRestaurantList: response.data.slice(),
                        currentSearchResult: response.data.slice()
                    });
                    
                    // this.sortRestaurantByLocation();
                    console.log('resto list state ',this.state.currentSearchResult);
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

        this.populateDishList();
        this.filterByDishName('');
    }

    handleRadioButtons = (event) => {
        const target = event.target;
        const targetValue = target.value;
        const targetChecked = target.checked;
        // console.log('checkbox event', targetValue, ' ', targetChecked);
        this.setState(state => {
            state.selectedFilter = targetValue;
            return state.selectedFilter;
        });
    }
    
    handleSearchInput = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    filterRestaurantByLocation = (requestedLocation) => {
        const defaultList = this.state.defaultRestaurantList;
        let closestList = defaultList.filter(restaurant => {
            if(restaurant.city.toLowerCase() === requestedLocation.toLowerCase()) {
                return restaurant;
            }
            return null;
        });
        if(requestedLocation === '') {
            closestList = defaultList;
        }
        this.setState({
            currentSearchResult: closestList.slice()
        });
        console.log('filtered by location ', this.state.currentSearchResult);
    }

    filterByDishName = (dishName) => {
        let defaultList = this.state.defaultDishList;
        let matchingRestaurants = defaultList.filter(dish => {
            if(dish.Dish_Name.toLowerCase().includes(dishName.toLowerCase())) {
                return dish.Restaurant_Email;
            }
            return null;
        });
        matchingRestaurants = matchingRestaurants.map(restaurant => restaurant.Restaurant_Email);
        defaultList = this.state.defaultRestaurantList;
        let filteredRestaurants = defaultList.filter(restaurant => {
            if(matchingRestaurants.includes(restaurant.email)) {
                return restaurant;
            }
            return null;
        });

        if(dishName === null || dishName === '') {
            filteredRestaurants = this.state.defaultRestaurantList;
        }
        this.setState({
            currentSearchResult: filteredRestaurants.slice()
        });
        console.log('filtered by dishname ', this.state.currentSearchResult);
    }

    filterByDeliveryMode = () => {
        let filter = this.state.selectedFilter;
        let filteredRestaurants = this.state.defaultRestaurantList.filter(restaurant => {
            if(filter === 'pickup' && restaurant.pickup === 1) {
                return restaurant;
            }
            else if(filter === 'delivery' && restaurant.delivery === 1) {
                return restaurant;
            }
        });
        this.setState({
            currentSearchResult: filteredRestaurants.slice()
        });
        console.log('filtered by pickup/delivery ', this.state.currentSearchResult);
    }

    populateDishList = () => {
        axios.get('/getAllDishes')
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data.slice());

                    this.setState({
                        defaultDishList: response.data.slice()
                    });
                    
                    console.log('dish list state ',this.state.defaultDishList);
                }
            })
            .catch(error => {
                console.log("get all dish details error");
                this.setState({
                    // isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get all dish details, please try again!");
            })
    }

    handleSearch = () => {
        console.log('handle search ', this.state.searchText);
        const searchQuery = this.state.searchText;
        if(this.state.selectedFilter === 'location') {
            this.filterRestaurantByLocation(searchQuery);
        }
        else if(this.state.selectedFilter === 'dishname') {
            this.filterByDishName(searchQuery);
        }
        else if(this.state.selectedFilter === 'delivery' || this.state.selectedFilter === 'pickup') {
            this.filterByDeliveryMode();
        }
        else if(this.state.selectedFilter === 'dishname') {
            this.filterByDeliveryMode(searchQuery);
        }
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

            <div className="container my-4">
                <h3>Search</h3>
                {/* <span className="nav-link" href="#"></span> */}
                <input 
                    type="radio" 
                    name="filter"
                    value="dishname"
                    className="mx-2"
                    checked={this.state.selectedFilter === "dishname"}
                    onChange={this.handleRadioButtons}    
                /><span>Dish Name</span>
                <input 
                    type="radio" 
                    name="filter"
                    value="location"
                    className="mx-2"
                    checked={this.state.selectedFilter === "location"}
                    onChange={this.handleRadioButtons}
                /><span>Location</span>
                <input 
                    type="radio" 
                    name="filter"
                    value="pickup"
                    className="mx-2"
                    checked={this.state.selectedFilter === "pickup"}
                    onChange={this.handleRadioButtons}
                /><span>Pickup</span>
                <input 
                    type="radio" 
                    name="filter"
                    value="delivery"
                    className="mx-2"
                    checked={this.state.selectedFilter === "delivery"}
                    onChange={this.handleRadioButtons}
                /><span>Delivery</span>
                <input type="search" 
                    value={this.state.searchText}  
                    onChange={this.handleSearchInput}
                    className="form-control ds-input my-2" 
                    placeholder="Search Restaurants..."     
                />
                <button 
                        className="btn btn-success my-2"
                        name="search"
                        onClick={this.handleSearch}
                    ><span>Search</span>
                </button>
                <div className="row my-1">
                    {this.state.currentSearchResult.map(item => {
                        return <SearchResult 
                                    key={item.Restaurant_ID} 
                                    details={item} />;
                    })}
                </div>
            </div>
            </>
        );
    }
}

export default Search;