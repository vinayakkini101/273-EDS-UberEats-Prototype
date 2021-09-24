import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Navbar/navbar';
import rootURL from '../config/setting';

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
                imageName: ''
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
            customerEmail: localStorage.getItem('userEmail') 
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
                        contactno: details.contact_number,
                        about: details.about,
                        nickname: details.nickname,
                        dob: details.dob.split('T')[0],
                        country: details.country,
                        state: details.state,
                        city: details.city,
                        imageLink: details.profile_picture 
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
                    <Link 
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
                                imageName: this.state.profileDetails.imageName
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

export default CustomerProfile;