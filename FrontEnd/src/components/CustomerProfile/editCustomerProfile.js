import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import NavBar from '../Navbar/navbar';
import rootURL from '../config/setting';

class EditCustomerProfile extends React.Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.state = {
            profileDetails: {
                name: this.props.location.name,
                about: this.props.location.about,
                email: this.props.location.email,
                contactno: this.props.location.contactno,
                dob: this.props.location.dob,
                nickname: this.props.location.nickname,
                country: this.props.location.country,
                state: this.props.location.state,
                city: this.props.location.city,
                imageLink: this.props.location.imageLink,
                imageName: this.props.location.imageName,
                street: this.props.location.street,
                currentEmail: this.props.location.email,
                currentStreet: this.props.location.street
            }
        }
    }

    handleUpload = (event) => {
        // event.preventDefault();
        console.log(event.target.files[0]);

        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('photos', imageFile);
        console.log('formData ', formData);

        axios.post('/uploadFile', formData)
            .then(response => {
                if (response.status === 200) {
                    console.log('Image name : ', imageFile.name);
                    this.setState({
                        profileDetails: {
                            ...this.state.profileDetails,
                            imageName: imageFile.name,
                            imageLink: '/items/download-image/' + imageFile.name
                        }
                    })
                    console.log('Customer pic link state ', this.state.profileDetails.imageLink);
                    this.imageRef.current.value = '';
                }
            })
    }

    handleChange = e => {
        this.setState({
            updateOperation: '',
            profileDetails: {
                ...this.state.profileDetails,
                [e.target.name]: e.target.value
            }
        })
    }

    handleDetailsUpdate = (event) => {
        event.preventDefault();
        
        axios.defaults.withCredentials = true;
        axios.post('/updateCustomerProfile', this.state.profileDetails)
            .then((response) => {
                if (response.status === 200) {
                    console.log("cust details update response ", response.data);
                    const details = response.data;
                    localStorage.setItem('userEmail', this.state.profileDetails.email);
                    this.setState({
                        updateOperation: 'success',
                        // profileDetails: {
                        //     id: details.Customer_ID,
                        //     name: details.name,
                        //     description: details.description,
                        //     email: details.email,
                        //     contactno: details.contact_number,
                        //     starttime: details.start_time,
                        //     endtime: details.end_time,
                        //     country: details.country,
                        //     state: details.state,
                        //     city: details.City,
                        //     imageLink: details.Display_Picture,
                        //     street: details.street
                        // }
                    })
                }
            })
            .catch(error => {
                console.log("update Customer details error");
                this.setState({
                    updateOperation: 'failure'
                });
                console.log(error);
                alert("Unable to update Customer details, please try again!");
            })
    }

    handleAddressUpdate = (event) => {
        event.preventDefault();
        
        axios.defaults.withCredentials = true;
        axios.post('/updateCustomerAddress', this.state.profileDetails)
            .then((response) => {
                if (response.status === 200) {
                    console.log("handleaddressupdate response ", response.data);
                    const details = response.data;
                    localStorage.setItem('userEmail', this.state.profileDetails.email);
                    this.setState({
                        updateOperation: 'success',
                        // profileDetails: {
                        //     country: details.country,
                        //     state: details.state,
                        //     city: details.City,
                        //     street: details.street
                        // }
                    })
                }
            })
            .catch(error => {
                console.log("Update Customer address error");
                this.setState({
                    updateOperation: 'failure'
                });
                console.log(error);
                alert("Unable to update Customer address, please try again!");
            })
    }

    render() {
        let authenticate = null;
        if( !cookie.load('cookie')) {
            console.log('hello');
            authenticate = <Redirect to='/login' />;
        }

        let errorMessage = null;
        let redirectVar = null;
        if(this.state.updateOperation === 'failure') {
            errorMessage = <div className='alert alert-danger'>Update failed</div>;
        }
        else if(this.state.updateOperation === 'success') {
            redirectVar = <Redirect to={`/CustomerProfile/${this.state.profileDetails.email}`} />;
        }

        return (
            <>
            {authenticate}
            <NavBar />

            <div className='container my-4'>
                <h3>Edit Profile</h3>
                <div className="row">
                    <div className="col-3">
                        <img 
                            src={(this.state.profileDetails.imageLink) || ''} 
                            className='img-fluid img-thumbnail rounded-circle z-depth-5'
                            alt='Display' 
                            style={{width: '15rem', height: '15rem'}}
                        />
                    </div>
                    <div className="col-9">
                        <form encType="multipart/form-data">
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">Choose Picture</label>
                                </div>
                                <div className="col-6">
                                    <input 
                                        type='file'
                                        accept="image/*"
                                        ref={this.imageRef}
                                        onChange={this.handleUpload}
                                    >
                                    </input>
                                </div>
                            </div>
                            {/* <input 
                                type='file'
                                accept='image/*'
                                ref={this.imageRef}
                                onChange={this.handleUpload}
                            >
                            </input> */}
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="name" className="col-form-label">Name *</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="name" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.name} 
                                    onChange={this.handleChange}
                                    required
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="email" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.email} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="contactno" className="col-form-label">Contact Number</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="contactno" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.contactno} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="about" className="col-form-label">About</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="about" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.about} 
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="dob" className="col-form-label">Date of Birth</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="dob" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.dob} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                        </form>
                        <button 
                                type='button'
                                className='btn btn-success'
                                onClick={this.handleDetailsUpdate}
                            > 
                                Update Details
                        </button>
                    
                    

                        <form>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="street" className="col-form-label">Street Address</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="street" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.street} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="city" className="col-form-label">City</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="city" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.city} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="state" className="col-form-label">State</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="state" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.state} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="country" className="col-form-label">Country</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="country" className="form-control" 
                                    // disabled 
                                    value={this.state.profileDetails.country} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <button 
                                    type='button'
                                    className='btn btn-success'
                                    onClick={this.handleAddressUpdate}
                                > 
                                    Update Address
                            </button>
                        </form>
                    </div>
                </div>
                
                

                {errorMessage}

                {redirectVar}

            </div>
            </>
        );
    }
}

export default EditCustomerProfile;