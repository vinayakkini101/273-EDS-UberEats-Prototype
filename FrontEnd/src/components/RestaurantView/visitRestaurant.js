import React from "react";
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from "react-router";
import NavBar from "../Navbar/navbar";
import { Link } from "react-router-dom";

class VisitRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDetails: {
                id: '',
                name: '',
                description: '',
                email: '',
                contactno: '',
                starttime: '',
                endtime: '',
                country: '',
                state: '',
                city: '',
                imageLink: '',
                imageName: '',
                restaurantEmail: props.match.params.RestaurantEmail
            },
            dishList: []
        }

        console.log('email state in visitResto ', this.state.profileDetails.restaurantEmail);
        // console.log('resto email in visitResto ', this.state.profileDetails.restaurantEmail);
    }

    componentDidMount = () => {
        this.getProfileDetails();
        this.populateDishList();
    }

    getProfileDetails = () => {
        // console.log('get prof details localstore email  ', localStorage.getItem('userEmail'));
        axios.defaults.withCredentials = true;
        axios.post('/getRestaurantProfile', {
            restaurantEmail: this.state.profileDetails.restaurantEmail
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    const details = response.data;
                    this.setState({
                        // isPageUpdated: true,
                        profileDetails: {
                            id: details.Restaurant_ID,
                            name: details.name,
                            description: details.description,
                            email: details.email,
                            contactno: details.contact_number,
                            starttime: details.start_time,
                            endtime: details.end_time,
                            country: details.country,
                            state: details.state,
                            city: details.City,
                            imageLink: details.Display_Picture 
                        }
                    })
                }
            })
            .catch(error => {
                console.log("get restaurant details error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get restaurant details, please try again!");
            })
    }


    populateDishList = () => {
        axios.get('/getAllDishes', {
            params: {
                restaurantEmail: this.state.profileDetails.restaurantEmail
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data.slice());

                    this.setState({
                        dishList: response.data.slice(),
                    });
                    
                    console.log('dish list state ',this.state.dishList);
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

    render() {
        let authenticate = null;
        if( !cookie.load('cookie')) {
            console.log('hello');
            authenticate = <Redirect to='/login' />;
        }

        return (
            <>
            {authenticate}
            <NavBar />
            <div>VisitRestaurant</div>

            <div className='container'>
                <img src={this.state.profileDetails.imageLink || ''} className='img-fluid' alt='Display' />
                <div className="">{this.state.profileDetails.description}</div>
                <div>{this.state.profileDetails.city}, {this.state.profileDetails.state}, {this.state.profileDetails.country}</div>
                <div>Contact: {this.state.profileDetails.contactno}</div>
                <div className="row">
                    {this.state.dishList.map(dish => {
                        return <DishDisplayCard 
                                    key={dish.Dish_ID} 
                                    details={dish} />;
                    })}
                </div>
            </div>
            </>
        );
    }
}


class DishDisplayCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.details
        }
        console.log(this.state.details);
    }

    render() {
        return (
                <div className="card col-lg-3 col-md-6 col-12 g-4 m-2" style={{width: '3rem;'}}>
                    <img src={this.state.details.Dish_Image} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.details.Dish_Name}</h5>
                        <p className="card-text">{this.state.details.Description}</p>
                        <p className="card-text">Price: ${this.state.details.Price}</p>
                        <a href="" className="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
        );
    }
}

export default VisitRestaurant;