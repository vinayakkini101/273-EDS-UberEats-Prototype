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
            if(restaurant.City.toLowerCase() === requestedLocation.toLowerCase()) {
                return restaurant;
            }
        });
        if(requestedLocation === '') {
            closestList = defaultList;
        }
        this.setState({
            currentSearchResult: closestList
        });
        console.log('sorted by location ', this.state.currentSearchResult);
    }

    filterByDishName = (dishName) => {
        const defaultList = this.state.defaultDishList;
        let matchingDishes = defaultList.filter(dish => {
            if(dish.Dish_Name.toLowerCase() === dishName.toLowerCase()) {
                return dish;
            }
        });
        if(dishName === '') {
            matchingDishes = defaultList;
        }
        this.setState({
            currentSearchResult: matchingDishes
        });
        console.log('sorted by dishname ', this.state.currentSearchResult);
    }

    populateDishList = () => {
        axios.get('/getAllDishes')
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data.slice());

                    this.setState({
                        defaultDishList: response.data.slice(),
                        currentSearchResult: response.data.slice()
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
        else if(this.state.selectedFilter === 'delivery') {
            this.filterByDeliveryMode(searchQuery);
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
            <div>Search page</div>
            <div className="container">
                {/* <span className="nav-link" href="#"></span> */}
                <input 
                    type="radio" 
                    name="filter"
                    value="dishname"
                    checked={this.state.selectedFilter === "dishname"}
                    onChange={this.handleRadioButtons}    
                />Dish Name
                <input 
                    type="radio" 
                    name="filter"
                    value="location"
                    checked={this.state.selectedFilter === "location"}
                    onChange={this.handleRadioButtons}
                />Location
                <input 
                    type="radio" 
                    name="filter"
                    value="pickup"
                    checked={this.state.selectedFilter === "pickup"}
                    onChange={this.handleRadioButtons}
                />Pickup
                <input 
                    type="radio" 
                    name="filter"
                    value="delivery"
                    checked={this.state.selectedFilter === "delivery"}
                    onChange={this.handleRadioButtons}
                />Delivery
                <input type="search" 
                    value={this.state.searchText}  
                    onChange={this.handleSearchInput}
                    className="form-control ds-input" 
                    placeholder="Search Restaurants..."     
                />
                <button 
                    className="btn btn-success"
                    name="search"
                    onClick={this.handleSearch}
                > Search
                </button>
                <div className="row">
                    {this.state.currentSearchResult.map(item => {
                        return <SearchResult 
                                    key={item.Restaurant_ID || item.Dish_ID} 
                                    details={item} />;
                    })}
                </div>
            </div>
            </>
        );
    }
}

export default Search;