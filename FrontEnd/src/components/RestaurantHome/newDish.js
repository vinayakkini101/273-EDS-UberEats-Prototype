import axios from 'axios';
import React from 'react';
import rootURL from '../config/setting.js';


class NewDish extends React.Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.state = {
            dishDetails: {
                dishcode: '',
                dishname: '',
                ingredients: '',
                description: '',
                category: '',
                price: '',
                imageLink: '',
                imageName: ''
            },
            isPageUpdated: false
        }
    }
    
    handleAddNewDish = (event) => {
        event.preventDefault();
        
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('/addNewDish', {
                ...this.state.dishDetails, 
                restaurantEmail: localStorage.getItem('userEmail'),
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    this.setState({
                        isPageUpdated: true,
                        dishDetails: {
                            dishcode: '',
                            dishname: '',
                            ingredients: '',
                            description: '',
                            category: '',
                            price: '',
                            imageLink: '',
                            imageName: ''
                        }
                    })
                    this.props.handleGetAllDishes();
                }
            })
            .catch(error => {
                console.log("Add new dish error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to add new dish, please try again!");
            })
    }

    handleFieldInput = (e) => {
        // console.log(e.target.name, e.target.value);
        this.setState((state) => {
            state.dishDetails = {...state.dishDetails, [e.target.name] : e.target.value};
            return state.dishDetails;
        });
    }

    handleImageUpload = (event) => {
        console.log(event.target.files[0]);

        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('photos', imageFile);
        console.log('formData ', formData);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('/uploadFile', formData)
            .then(response => {
                if (response.status === 200) {
                    console.log('Image name : ', imageFile.name);
                    this.setState({
                        dishDetails: {
                            ...this.state.dishDetails,
                            // imageName: imageFile.name
                            imageLink: imageFile.name
                        }
                    })
                    console.log('dish link state ', this.state.dishDetails.imageName);
                    this.imageRef.current.value = '';
                }
            })
      }

    render() {
        return (
            <>
            {/* <div className="container"> */}
                <form encType="multipart/form-data" onSubmit={this.handleAddNewDish} className="mb-5">
                    <div className="row align-items-end">
                        <div className="col-1">
                            <label htmlFor="inputEmail4" className="form-label">Code *</label>
                            <input type="number" name="dishcode" className="form-control" 
                                value={this.state.dishDetails.dishcode} 
                                onChange={this.handleFieldInput} 
                                required
                            />
                        </div> 
                        <div className="col-2">
                            <label htmlFor="inputEmail4" className="form-label">Dish Name *</label>
                            <input type="text" name="dishname" className="form-control" 
                                value={this.state.dishDetails.dishname} 
                                onChange={this.handleFieldInput} 
                                required
                            />
                        </div> 
                        <div className="col-2">
                            <label htmlFor="inputPassword4" className="form-label">Ingredients *</label>
                            <input type="text" name="ingredients" className="form-control" 
                                value={this.state.dishDetails.ingredients} 
                                onChange={this.handleFieldInput} 
                                required
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="inputEmail4" className="form-label">Description *</label>
                            <input type="text" name="description" className="form-control" 
                                value={this.state.dishDetails.description} 
                                onChange={this.handleFieldInput}  
                                required
                            />
                        </div>
                        <div className="col-1">
                            <label htmlFor="inputPassword4" className="form-label">Category *</label>
                            <select 
                                type="dropdown"
                                id="category" 
                                name="category" 
                                className="form-select"
                                onChange={this.handleFieldInput}  
                                value={this.state.dishDetails.category}   
                            >
                                <option value="Appetizers">Appetizers</option>
                                <option value="Salads">Salads</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Beverages">Beverages</option>
                            </select>
                        </div>
                        <div className="col-1">
                            <label htmlFor="inputEmail4" className="form-label">Price *</label>
                            <input type="number" step="any" name="price" className="form-control" 
                                value={this.state.dishDetails.price} 
                                onChange={this.handleFieldInput}
                                required 
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="dishimage" className="form-label">Image</label>
                            <input type="file" name="dishimage" className="form-control" 
                                accept="image/*"
                                ref={this.imageRef}
                                onChange={this.handleImageUpload} 
                            />
                        </div> 
                        <div className="col-1">
                            <button 
                                type="submit" 
                                className="btn btn-success"
                            >
                                Add Dish
                            </button>
                        </div>
                    </div>
                </form>
            {/* </div> */}
            </>
        );
    }
}

export default NewDish;