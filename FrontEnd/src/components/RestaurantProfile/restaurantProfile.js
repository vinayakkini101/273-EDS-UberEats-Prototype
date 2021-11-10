import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/navbar';
import s3BucketURL from '../config/setting.js';
import { connect } from 'react-redux';
import { getRestaurantProfileAsync } from '../../js/middleware/index.js';

class RestaurantProfile extends React.Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
    } 

    componentDidMount = () => {
        this.props.getRestaurantProfile(this.props.match.params.RestaurantEmail);
        console.log('redux props ', this.props.profileDetails);
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

    render() {
        // let authenticate = null;
        // if( !cookie.load('cookie')) {
        //     console.log('hello');
        //     authenticate = <Redirect to='/login' />;
        // }
    // {console.log('props from reducer ', this.props.profileDetails)}
        return (
            <>
                <NavBar />

                {/* {authenticate} */}

                <div className='container my-4'>
                    <h3>My profile</h3>
                    <div className="row">
                        <div className="col-3">
                            <img 
                                src={s3BucketURL+this.props.profileDetails.profilePicture || ''}
                                // {this.state.profileDetails.imageLink || ''} 
                                className='img-fluid img-thumbnail rounded-circle z-depth-5' 
                                alt='Display' 
                                style={{width: '15rem', height: '15rem'}}
                            />
                            {/* <label className="form-label">Display picture</label> */}
                        </div>
                        <div className="col-9">
                                <form encType="multipart/form-data">
                                    {/* <div className="row mb-3 align-items-center">
                                        <div className="col-3">
                                            <label htmlFor="" className="col-form-label">Restaurant ID</label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" name="id" className="form-control" 
                                            value={this.state.profileDetails.id} 
                                            readOnly
                                        />
                                        </div>
                                    </div> */}
                                    <div className="row mb-3 align-items-center">
                                        <div className="col-3">
                                            <label htmlFor="" className="col-form-label">Name</label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" name="name" className="form-control" 
                                            // disabled 
                                            value={this.props.profileDetails.name} 
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
                                            value={this.props.profileDetails.description} 
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
                                            value={this.props.profileDetails.email} 
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
                                            value={this.props.profileDetails.contactNumber} 
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
                                            value={this.props.profileDetails.startTime} 
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
                                            value={this.props.profileDetails.endTime} 
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
                                            value={this.props.profileDetails.address[0].street} 
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
                                            value={this.props.profileDetails.address[0].city} 
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
                                            value={this.props.profileDetails.address[0].state} 
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
                                            value={this.props.profileDetails.address[0].country} 
                                            readOnly
                                        />
                                        </div>
                                    </div> 
                                    <div className="row mb-3 align-items-center">
                                        <input className="form-check-input mt-0" 
                                            name="pickup" 
                                            type="checkbox" 
                                            checked={this.props.profileDetails.pickup} 
                                            disabled
                                            onChange={this.handleCheckbox}
                                        />
                                        Atleast 1 item available for pickup
                                    </div>
                                    <div className="row mb-3 align-items-center">
                                        <input className="form-check-input mt-0" 
                                            name="delivery" 
                                            type="checkbox" 
                                            checked={this.props.profileDetails.delivery} 
                                            disabled
                                            onChange={this.handleCheckbox}
                                        />
                                            Atleast 1 item available for delivery
                                    </div>
                                    <div className="row mb-3 align-items-center">
                                        <input className="form-check-input mt-0" 
                                            name="veg" 
                                            type="checkbox" 
                                            checked={this.props.profileDetails.veg} 
                                            disabled
                                            onChange={this.handleCheckbox}
                                        />
                                            Atleast 1 item available in veg
                                    </div>
                                    <div className="row mb-3 align-items-center">
                                        <input className="form-check-input mt-0" 
                                            name="nonVeg" 
                                            type="checkbox" 
                                            checked={this.props.profileDetails.nonVeg} 
                                            disabled
                                            onChange={this.handleCheckbox}
                                        />
                                            Atleast 1 item available in non-veg 
                                    </div>
                                    <div className="row mb-3 align-items-center">
                                        <input className="form-check-input mt-0" 
                                            name="vegan" 
                                            type="checkbox" 
                                            checked={this.props.profileDetails.vegan} 
                                            disabled
                                            onChange={this.handleCheckbox}
                                        />
                                            Atleast 1 item available in vegan
                                    </div>
                                </form>
                            <Link 
                                to={{pathname: '/EditRestaurantProfile', 
                                        id: this.props.profileDetails.id,
                                        name: this.props.profileDetails.name,
                                        description: this.props.profileDetails.description,
                                        email: this.props.profileDetails.email,
                                        contactno: this.props.profileDetails.contactNumber,
                                        starttime: this.props.profileDetails.startTime,
                                        endtime: this.props.profileDetails.endTime,
                                        country: this.props.profileDetails.address[0].country,
                                        state: this.props.profileDetails.address[0].state,
                                        city: this.props.profileDetails.address[0].city,
                                        imageLink: this.props.profileDetails.imageLink,
                                        imageName: this.props.profileDetails.profilePicture,
                                        pickup: this.props.profileDetails.pickup,
                                        delivery: this.props.profileDetails.delivery,
                                        veg: this.props.profileDetails.veg,
                                        nonVeg: this.props.profileDetails.nonVeg,
                                        vegan: this.props.profileDetails.vegan,
                                        street: this.props.profileDetails.address[0].street
                                    }} 
                                type='button'
                                className='btn btn-success'
                            > 
                                Edit
                            </Link>
                        </div>
                    </div>
                    
                    
                    
                </div>
                
                
            </>
        );
        
    }
}

function mapStateToProps(state) {
    return {
        profileDetails: state.restaurantProfileDetails,
        address: state.restaurantProfileDetails.address
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRestaurantProfile: restaurantEmail => dispatch(getRestaurantProfileAsync(restaurantEmail))
    }
}

const ConnectedRestaurantProfile = connect(mapStateToProps, mapDispatchToProps)(RestaurantProfile);
export default ConnectedRestaurantProfile;