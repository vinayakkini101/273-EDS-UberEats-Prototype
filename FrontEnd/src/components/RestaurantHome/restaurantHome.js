import axios from 'axios';
import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import NavBar from '../Navbar/navbar';
import NewDish from './newDish.js'

class RestaurantHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageUpdated: false,
            dishList: []
        }
    }

    componentDidMount = () => {
        this.handleGetAllDishes();
    }

    handleGetAllDishes = () => {
        axios.get('/getAllDishes', {
            params: {
                restaurantEmail: localStorage.getItem('userEmail')
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);

                    let dishList = [];
                    for(let document of response.data) {
                        if(document.dishes.length > 0) {
                            document.dishes.restaurantEmail = document.email;
                            Array.prototype.push.apply(dishList, document.dishes);
                        }
                    }

                    this.setState({
                        isPageUpdated: true,
                        dishList: dishList.slice()
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

    handleDeleteDish = (e) => {
        console.log('delete dish e target ', e.target.name);
        axios.post('/deleteDish', {
            dishCode: [e.target.name],
            restaurantEmail: localStorage.getItem('userEmail') 
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    this.setState({
                        isPageUpdated: true,
                    })
                    this.componentDidMount();
                }
            })
            .catch(error => {
                this.componentDidMount();
                console.log("Delete dish error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to delete dish, please try again!");

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
            
            <div className="container my-4">
            
                {authenticate}
                <h3>Menu</h3>
                <table className="table">
                    <thead>
                        <tr key="headingKey">
                            <th scope="col">Image</th>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Ingredients</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dishList.map(dish => {
                            return (
                                <tr key={dish.dishCode}>
                                    <td>
                                        <img 
                                            src={dish.dishImage} 
                                            className='img-fluid img-thumbnail' 
                                            alt=''
                                            style={{width: '15rem', height: '7rem'}}
                                        >
                                        </img>
                                    </td>
                                    {/* className='img-fluid' */}
                                    {/* style={{width: '8rem', height: '5rem'}} */}
                                    <td>{dish.dishCode}</td>
                                    <td>{dish.dishName}</td>
                                    <td>{dish.ingredients}</td>
                                    <td>{dish.description}</td>
                                    <td>{dish.category}</td>
                                    <td>${dish.price}</td>
                                    <td>
                                        <button
                                            name={dish.dishCode}
                                            className="btn btn-danger"
                                            onClick={this.handleDeleteDish}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>


                <NewDish handleGetAllDishes={this.handleGetAllDishes} />
                
            </div>
            </>
        )
    }
}

export default RestaurantHome;