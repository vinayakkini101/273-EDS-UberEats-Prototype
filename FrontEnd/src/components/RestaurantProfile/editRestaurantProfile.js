import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import NavBar from '../Navbar/navbar';
import rootURL from '../config/setting';

class EditRestaurantProfile extends React.Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.state = {
            profileDetails: {
                id: this.props.location.id,
                name: this.props.location.name,
                description: this.props.location.description,
                email: this.props.location.email,
                contactno: this.props.location.contactno,
                starttime: this.props.location.starttime,
                endtime: this.props.location.endtime,
                country: this.props.location.country,
                state: this.props.location.state,
                city: this.props.location.city,
                imageLink: this.props.location.imageLink,
                imageName: this.props.location.imageName,
                pickup: this.props.location.pickup,
                delivery: this.props.location.delivery,
                veg: this.props.location.veg,
                nonVeg: this.props.location.nonVeg,
                vegan: this.props.location.vegan,
                currentStreet: this.props.location.street,
                updatedStreet: this.props.location.street,
                currentEmail: this.props.location.email
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
                    console.log('restaurant pic link state ', this.state.profileDetails.imageLink);
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

    handleCheckbox = (event) => {
        this.setState({
            profileDetails: {
                ...this.state.profileDetails,
                [event.target.name] : event.target.checked
            }
        }) 
    }

    handleDetailsUpdate = (event) => {
        event.preventDefault();
        
        axios.defaults.withCredentials = true;
        axios.post('/updateRestaurantProfile', this.state.profileDetails)
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    const details = response.data;
                    localStorage.setItem('userEmail', this.state.profileDetails.email);
                    this.setState({
                        updateOperation: 'success'
                    })
                }
            })
            .catch(error => {
                console.log("update restaurant details error");
                this.setState({
                    updateOperation: 'failure'
                });
                console.log(error);
                alert("Unable to update restaurant details, please try again!");
            })
    }

    handleAddressUpdate = (event) => {
        event.preventDefault();
        
        axios.defaults.withCredentials = true;
        axios.post('/updateRestaurantAddress', this.state.profileDetails)
            .then((response) => {
                if (response.status === 200) {
                    console.log("handleaddressupdate response ", response.data);
                    const details = response.data;
                    localStorage.setItem('userEmail', this.state.profileDetails.email);
                    this.setState({
                        updateOperation: 'success'
                    })
                }
            })
            .catch(error => {
                console.log("Update Restaurant address error");
                this.setState({
                    updateOperation: 'failure'
                });
                console.log(error);
                alert("Unable to update Restaurant address, please try again!");
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
            redirectVar = <Redirect to={`/RestaurantProfile/${this.state.profileDetails.email}`} />;
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
                            src={this.state.profileDetails.imageLink || ''} 
                            className='img-fluid img-thumbnail rounded-circle z-depth-5'
                            alt='Display' 
                            style={{width: '15rem', height: '15rem'}}
                        />
                    </div>
                    <div className="col-9">
                        <form encType="multipart/form-data" onSubmit={this.handleDetailsUpdate}>
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
                                {/* <div className="row mb-3 align-items-center">
                                    <div className="col-3">
                                        <label htmlFor="" className="col-form-label">Restaurant ID</label>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="id" className="form-control" 
                                        value={this.state.profileDetails.id} 
                                        onChange={this.handleChange}
                                    />
                                    </div>
                                </div> */}
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">Name</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="name" className="form-control" 
                                    required
                                    value={this.state.profileDetails.name} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">Description</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="description" className="form-control" 
                                    required
                                    value={this.state.profileDetails.description} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">Email</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="email" className="form-control" 
                                    required
                                    value={this.state.profileDetails.email} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">Contact Number</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="contactno" className="form-control" 
                                    required
                                    value={this.state.profileDetails.contactno} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">Start Time</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="starttime" className="form-control" 
                                    required
                                    value={this.state.profileDetails.starttime} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">End Time</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="endtime" className="form-control" 
                                    required
                                    value={this.state.profileDetails.endtime} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                    <input className="form-check-input mt-0" 
                                        name="pickup" 
                                        type="checkbox" 
                                        checked={this.state.profileDetails.pickup} 
                                        onChange={this.handleCheckbox}
                                    />
                                    Atleast 1 item available for pickup
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <input className="form-check-input mt-0" 
                                        name="delivery" 
                                        type="checkbox" 
                                        checked={this.state.profileDetails.delivery} 
                                        onChange={this.handleCheckbox}
                                    />
                                        Atleast 1 item available for delivery
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <input className="form-check-input mt-0" 
                                        name="veg" 
                                        type="checkbox" 
                                        checked={this.state.profileDetails.veg} 
                                        onChange={this.handleCheckbox}
                                    />
                                        Atleast 1 item available in veg
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <input className="form-check-input mt-0" 
                                        name="nonVeg" 
                                        type="checkbox" 
                                        checked={this.state.profileDetails.nonVeg} 
                                        onChange={this.handleCheckbox}
                                    />
                                        Atleast 1 item available in non-veg 
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <input className="form-check-input mt-0" 
                                        name="vegan" 
                                        type="checkbox" 
                                        checked={this.state.profileDetails.vegan} 
                                        onChange={this.handleCheckbox}
                                    />
                                        Atleast 1 item available in vegan
                                </div>
                                <button 
                                        type='submit'
                                        className='btn btn-success'
                                    > 
                                        Update details
                                </button>
                        </form>
                        
                        <form onSubmit={this.handleAddressUpdate}>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="street" className="col-form-label">Street Address</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="updatedStreet" className="form-control" 
                                    required
                                    value={this.state.profileDetails.updatedStreet} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">City</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="city" className="form-control" 
                                    required
                                    value={this.state.profileDetails.city} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">State</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="state" className="form-control" 
                                    required 
                                    value={this.state.profileDetails.state} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-3">
                                    <label htmlFor="" className="col-form-label">Country</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="country" className="form-control" 
                                    required
                                    value={this.state.profileDetails.country} 
                                    onChange={this.handleChange}
                                />
                                </div>
                            </div>
                            <button 
                                type='submit'
                                className='btn btn-success'
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

export default EditRestaurantProfile;