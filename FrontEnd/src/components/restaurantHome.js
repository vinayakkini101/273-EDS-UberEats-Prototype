import axios from 'axios';
import React from 'react';
import NavBar from './Navbar/navbar';

class RestaurantHome extends React.Component {

    render() {
        return (
            <>
            <NavBar />
            <DishList />
            </>
        );
    }
}

class DishList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageUpdated: false,
            dishList: []
        }
    }

    handleGetAllDishes = () => {
        axios.get('http://localhost:3000/getAllDishes', {
            params: {
                restaurantEmail: localStorage.getItem('userEmail')
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    this.setState({
                        isPageUpdated: true,
                        dishList: response.data.slice()
                    })
                }
            })
            .catch(error => {
                console.log("Get all dishes error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get dishes, please try again!");
            })
    }

    handleAddNewDish = () => {

    }

    handleDeleteDish = () => {

    }

    render() {
        return (
            <>
            <div className="container">
                <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={this.handleGetAllDishes}
                >
                    Get All Dishes
                </button>
                <table className="table">
                    <thead>
                        <tr key="headingKey">
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Dish Name</th>
                            <th scope="col">Ingredients</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dishList.map(dish => {
                            return (
                                <tr key={dish.Dish_ID}>
                                    <td>{dish.Dish_Name}</td>
                                    <td>{dish.Ingredients}</td>
                                    <td>{dish.Description}</td>
                                    <td>{dish.Category}</td>
                                    <td>{dish.Price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            
            
                

                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="inputEmail4" className="form-label">Dish name</label>
                        </div>
                        <div className="col-2">
                            <label htmlFor="inputPassword4" className="form-label">ingred</label>
                        </div>
                        <div className="col-2">
                            <label htmlFor="inputEmail4" className="form-label">Descr</label>
                        </div>
                        <div className="col-2">
                            <label htmlFor="inputPassword4" className="form-label">cate</label>
                        </div>
                        <div className="col-2">
                            <label htmlFor="inputEmail4" className="form-label"> price</label>
                        </div>
                        <div className="col-2">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-success">Add New Dish</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default RestaurantHome;