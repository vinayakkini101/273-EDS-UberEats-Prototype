import axios from 'axios';
import React from 'react';
import NavBar from '../Navbar/navbar';
import DishList from './DishList';

class RestaurantHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dishDetails: {
                dishname: '',
                ingredients: '',
                description: '',
                category: '',
                price: ''
            },
            isPageUpdated: false
        }
    }
    
    handleAddNewDish = (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/addNewDish', {
                ...this.state.dishDetails, 
                restaurantEmail: localStorage.getItem('userEmail') 
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    this.setState({
                        isPageUpdated: true,
                        dishDetails: {
                            dishname: '',
                            ingredients: '',
                            description: '',
                            category: '',
                            price: ''
                        }
                    })
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
        console.log(e.target.name, e.target.value);
        this.setState((state) => {
            state.dishDetails = {...state.dishDetails, [e.target.name] : e.target.value};
            return state.dishDetails;
        })
    }

    render() {
        return (
            <>
            <NavBar />
            <DishList />

            <div className="container">
                <form>
                    <div className="row align-items-end">
                        <div className="col-2">
                            <label htmlFor="inputEmail4" className="form-label">dish name</label>
                            <input type="text" name="dishname" className="form-control" 
                                value={this.state.dishDetails.dishname} 
                                onChange={this.handleFieldInput} 
                            />
                        </div> 
                        <div className="col-2">
                            <label htmlFor="inputPassword4" className="form-label">ingred</label>
                            <input type="text" name="ingredients" className="form-control" 
                                value={this.state.dishDetails.ingredients} 
                                onChange={this.handleFieldInput} 
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="inputEmail4" className="form-label">Descr</label>
                            <input type="text" name="description" className="form-control" 
                                value={this.state.dishDetails.description} 
                                onChange={this.handleFieldInput}  
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="inputPassword4" className="form-label">cate</label>
                            <input type="text" name="category" className="form-control" 
                                value={this.state.dishDetails.category} 
                                onChange={this.handleFieldInput}  
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="inputEmail4" className="form-label"> price</label>
                            <input type="text" name="price" className="form-control" 
                                value={this.state.dishDetails.price} 
                                onChange={this.handleFieldInput} 
                            />
                        </div>
                        <div className="col-2">
                            <button 
                                type="submit" 
                                className="btn btn-success"
                                onClick={this.handleAddNewDish}
                            >
                                Add New Dish
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            </>
        );
    }
}

export default RestaurantHome;