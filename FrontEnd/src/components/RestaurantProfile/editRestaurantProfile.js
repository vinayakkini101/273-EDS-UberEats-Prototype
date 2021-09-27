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
                imageName: this.props.location.imageName
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
                            imageLink: rootURL + '/items/download-image/' + imageFile.name
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

    handleUpdate = (event) => {
        event.preventDefault();
        
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/updateRestaurantProfile', this.state.profileDetails)
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    const details = response.data;
                    this.setState({
                        updateOperation: 'success',
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
                console.log("update restaurant details error");
                this.setState({
                    updateOperation: 'failure'
                });
                console.log(error);
                alert("Unable to update restaurant details, please try again!");
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
            redirectVar = <Redirect to='/RestaurantProfile' />;
        }

        return (
            <>
            {authenticate}
            <NavBar />
            <div>Edit Restaurant profile</div>
            <div className='container'>
                <img src={this.state.profileDetails.imageLink || ''} className='img-fluid' alt='Display' />
                <form encType="multipart/form-data">
                    <input 
                        type='file'
                        ref={this.imageRef}
                        onChange={this.handleUpload}
                    >
                    </input>
                    <div className="row mb-3 align-items-center">
                        <div className="col-3">
                            <label htmlFor="" className="col-form-label">Restaurant ID</label>
                        </div>
                        <div className="col-6">
                            <input type="text" name="id" className="form-control" 
                            value={this.state.profileDetails.id} 
                            onChange={this.handleChange}
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
                            // disabled 
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
                            // disabled 
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
                            // disabled 
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
                            // disabled 
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
                            // disabled 
                            value={this.state.profileDetails.endtime} 
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
                            // disabled 
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
                            // disabled 
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
                            // disabled 
                            value={this.state.profileDetails.country} 
                            onChange={this.handleChange}
                        />
                        </div>
                    </div>
                </form>
                <button 
                        type='button'
                        className='btn btn-success'
                        onClick={this.handleUpdate}
                    > 
                        Update
                </button>
                
                {errorMessage}

                {redirectVar}

            </div>
            </>
        );
    }
}

export default EditRestaurantProfile;