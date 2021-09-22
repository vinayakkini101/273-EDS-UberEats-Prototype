import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import NavBar from '../Navbar/navbar';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
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
                city: this.props.location.city 
            }
        }
    }

    handleChange = e => {
        this.setState({
            profileDetails: {
                ...this.state.profileDetails,
                [e.target.name]: e.target.value
            }
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
            <div>Edit profile</div>
            <div className='container'>
                <form>
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
            </div>
            </>
        );
    }
}

export default EditProfile;