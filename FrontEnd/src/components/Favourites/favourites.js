import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/navbar';

class Favourites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favouritesList: []
        }
    }

    componentDidMount = () => {
        this.getFavourites();
    }

    getFavourites = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getFavourites', {
            userEmail: localStorage.getItem('userEmail')
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);

                    this.setState({
                        favouritesList: response.data.favourites.slice()
                    });
                    
                    // for(let restaurant of this.state.favouritesList) {
                        // this.getProfileDetails(this.state.favouritesList.indexOf(restaurant));

                    // }
                    console.log(this.state.favouritesList);
                }
            })
            .catch(error => {
                console.log("getFavourites error");
                this.setState({
                    // isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to getFavourites, please try again!");
            })
    }

    // getProfileDetails = (favouriteIndex) => {
    //     console.log('getprofiledetails ', favouriteIndex);
    //     let currentFavourite = this.state.favouritesList[favouriteIndex];

    //     axios.post('/getRestaurantProfile', {
    //         restaurantEmail: currentFavourite.restaurantEmail
    //     })
    //     .then((response) => {
    //         if (response.status === 200) {
    //             console.log("response ", response.data);
    //             const details = response.data;
    //             this.setState(state => {
    //                 let newFavouritesList = state.favouritesList.slice();
    //                 newFavouritesList[favouriteIndex] = {
    //                     ...newFavouritesList[favouriteIndex],
    //                     // id: details._id,
    //                     name: details.name,
    //                     description: details.description,
    //                     state: details.address[0].state,
    //                     city: details.address[0].city,
    //                     imageLink: details.profilePicture,
    //                     street: details.address[0].street
    //                 }
    //                 return {favouritesList: newFavouritesList};
    //             })

    //         }
    //     })
    //     .catch(error => {
    //         console.log("get restaurant details error");
    //         this.setState({
    //             isPageUpdated: "false"
    //         });
    //         console.log(error);
    //         alert("Unable to get restaurant details, please try again!");
    //     })
    // }

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
            <div className="container mt-3 mb-5">
                <h4>Your Favourites!</h4>
                <div className="row justify-items-start">
                    {this.state.favouritesList.map(restaurant => {
                        return (
                            <div className="col-3" key={restaurant.email}>
                                <Link to={`/Restaurant/${restaurant.email}`} >
                                    <div className="card my-2" style={{width: "15rem"}}>
                                        <img src={restaurant.profilePicture} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{restaurant.name}</h5>
                                            <p>{restaurant.email}</p>
                                            {restaurant.city}, {restaurant.state}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            </>
        );
    }
}

export default Favourites;