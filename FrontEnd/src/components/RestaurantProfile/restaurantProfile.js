import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Navbar/navbar';
import rootURL from '../config/setting';

class RestaurantProfile extends React.Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.state = {
            val: 1,
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
                pickup: false,
                delivery: false,
                veg: false,
                nonveg: false,
                vegan: false,
                street: ''
            }
        }
    } 

    componentDidMount = () => {
        this.getProfileDetails();
    }

    handleChange = (e) => {
        this.setState({
            profileDetails : {
                ...this.state.profileDetails,
                [e.target.name]: e.target.value
            }
        })
    }

    handleCheckbox = (event) => {
        this.setState({
            profileDetails: {
                ...this.state.profileDetails,
                [event.target.name] : event.target.checked
            }
        }) 
    }

    getProfileDetails = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getRestaurantProfile', {
            restaurantEmail: this.props.match.params.RestaurantEmail
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
                        city: details.city,
                        imageLink: details.Display_Picture,
                        pickup: details.pickup === 1 ? true : false,
                        delivery: details.delivery === 1 ? true : false,
                        veg: details.veg === 1 ? true : false,
                        nonveg: details.nonveg === 1 ? true : false,
                        vegan: details.vegan === 1 ? true : false,
                        street: details.street
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

                <div className='container'>
                
                    <img src={this.state.profileDetails.imageLink || ''} className='img-fluid' alt='Display' />
                    {/* <label className="form-label">Display picture</label> */}
                    
                    <form encType="multipart/form-data">
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">Restaurant ID</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="id" className="form-control" 
                                value={this.state.profileDetails.id} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">Name</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="name" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.name} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">Description</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="description" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.description} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">Email</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="email" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.email} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">Contact Number</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="contactno" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.contactno} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">Start Time</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="starttime" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.starttime} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">End Time</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="endtime" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.endtime} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="street" className="col-form-label">Street Address</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="street" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.street} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">City</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="city" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.city} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">State</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="state" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.state} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3">
                                <label htmlFor="" className="col-form-label">Country</label>
                            </div>
                            <div className="col-6">
                                <input type="text" name="country" className="form-control" 
                                // disabled 
                                value={this.state.profileDetails.country} 
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <input className="form-check-input mt-0" 
                                name="pickup" 
                                type="checkbox" 
                                checked={this.state.profileDetails.pickup} 
                                disabled
                                onChange={this.handleCheckbox}
                            />
                            Atleast 1 item available for pickup
                        </div>
                        <div className="row mb-3 align-items-center">
                            <input className="form-check-input mt-0" 
                                name="delivery" 
                                type="checkbox" 
                                checked={this.state.profileDetails.delivery} 
                                disabled
                                onChange={this.handleCheckbox}
                            />
                                Atleast 1 item available for delivery
                        </div>
                        <div className="row mb-3 align-items-center">
                            <input className="form-check-input mt-0" 
                                name="veg" 
                                type="checkbox" 
                                checked={this.state.profileDetails.veg} 
                                disabled
                                onChange={this.handleCheckbox}
                            />
                                Atleast 1 item available in veg
                        </div>
                        <div className="row mb-3 align-items-center">
                            <input className="form-check-input mt-0" 
                                name="nonveg" 
                                type="checkbox" 
                                checked={this.state.profileDetails.nonveg} 
                                disabled
                                onChange={this.handleCheckbox}
                            />
                                Atleast 1 item available in nonveg 
                        </div>
                        <div className="row mb-3 align-items-center">
                            <input className="form-check-input mt-0" 
                                name="vegan" 
                                type="checkbox" 
                                checked={this.state.profileDetails.vegan} 
                                disabled
                                onChange={this.handleCheckbox}
                            />
                                Atleast 1 item available in vegan
                        </div>
                    </form>
                    <Link 
                        to={{pathname: '/EditRestaurantProfile', 
                                id: this.state.profileDetails.id,
                                name: this.state.profileDetails.name,
                                description: this.state.profileDetails.description,
                                email: this.state.profileDetails.email,
                                contactno: this.state.profileDetails.contactno,
                                starttime: this.state.profileDetails.starttime,
                                endtime: this.state.profileDetails.endtime,
                                country: this.state.profileDetails.country,
                                state: this.state.profileDetails.state,
                                city: this.state.profileDetails.city,
                                imageLink: this.state.profileDetails.imageLink,
                                imageName: this.state.profileDetails.imageName,
                                pickup: this.state.profileDetails.pickup,
                                delivery: this.state.profileDetails.delivery,
                                veg: this.state.profileDetails.veg,
                                nonveg: this.state.profileDetails.nonveg,
                                vegan: this.state.profileDetails.vegan,
                                street: this.state.profileDetails.street
                            }} 
                        type='button'
                        className='btn btn-success'
                    > 
                        Edit
                    </Link>
                </div>
                
                
            </>
        );
        
    }
}

export default RestaurantProfile;