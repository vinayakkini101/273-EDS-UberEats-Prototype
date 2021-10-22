import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Navbar/navbar';
import s3BucketURL from '../config/setting.js';

class CustomerProfile extends React.Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.state = {
            val: 1,
            profileDetails: {
                name: '',
                email: '',
                about: '',
                nickname: '',
                contactno: '',
                dob: '',
                country: '',
                state: '',
                city: '',
                imageLink: '',
                imageName: '',
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

    getProfileDetails = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getCustomerProfile', {
            customerEmail: this.props.match.params.CustomerEmail
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("response ", response.data);
                const details = response.data;
                this.setState({
                    // isPageUpdated: true,
                    profileDetails: {
                        name: details.name,
                        email: details.email,
                        contactno: details.contactNumber,
                        about: details.about,
                        nickname: details.nickname,
                        dob: details.dob.split('T')[0],
                        country: details.address[0].country,
                        state: details.address[0].state,
                        city: details.address[0].city,
                        imageName: details.profilePicture,
                        street: details.address[0].street
                    }
                })
            }
        })
        .catch(error => {
            console.log("get customer details error");
            this.setState({
                isPageUpdated: "false"
            });
            console.log(error);
            alert("Unable to get customer details, please try again!");
        })
    }

    render() {
        let authenticate = null;
        if( !cookie.load('cookie')) {
            console.log('hello');
            authenticate = <Redirect to='/login' />;
        }

        let EditButton = null;
        if(localStorage.getItem('isRestaurant') === 'false') {
            EditButton = <Link 
                            to={{pathname: '/EditCustomerProfile', 
                                    name: this.state.profileDetails.name,
                                    about: this.state.profileDetails.about,
                                    email: this.state.profileDetails.email,
                                    contactno: this.state.profileDetails.contactno,
                                    dob: this.state.profileDetails.dob,
                                    nickname: this.state.profileDetails.nickname,
                                    country: this.state.profileDetails.country,
                                    state: this.state.profileDetails.state,
                                    city: this.state.profileDetails.city,
                                    imageLink: this.state.profileDetails.imageLink,
                                    imageName: this.state.profileDetails.imageName,
                                    street: this.state.profileDetails.street
                                }} 
                            type='button'
                            className='btn btn-success'
                        > 
                            Edit
                        </Link>;
        }


        return (
            <>
                <NavBar />
                {authenticate}
                <div className='container my-4'>
                    <h3>My profile</h3>
                    <div className="row">
                        <div className="col-3">
                            <img 
                                src={s3BucketURL+this.state.profileDetails.imageName || ''} 
                                className='img-fluid img-thumbnail rounded-circle z-depth-5'
                                alt='Display'
                                style={{width: '15rem', height: '15rem'}}
                            />
                            {/* <label className="form-label">Display picture</label> */}
                        </div>
                        <div className="col-9">
                            <form encType="multipart/form-data">
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
                                        <label htmlFor="" className="col-form-label">About</label>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="about" className="form-control" 
                                        // disabled 
                                        value={this.state.profileDetails.about} 
                                        readOnly
                                    />
                                    </div>
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="nickname" className="col-form-label">Nickname</label>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="nickname" className="form-control" 
                                        // disabled 
                                        value={this.state.profileDetails.nickname} 
                                        readOnly
                                    />
                                    </div>
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="dob" className="col-form-label">Date of Birth</label>
                                    </div>
                                    <div className="col-6">
                                        <input type="date" name="dob" className="form-control" 
                                        // disabled 
                                        value={this.state.profileDetails.dob} 
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
                            </form>

                            {EditButton}
                            
                        </div>
                    </div>
                    
                    
                    
                </div>
                
                
            </>
        );
        
    }
}

export default CustomerProfile;