import React from 'react';
import NavBar from '../Navbar/navbar';
import NewDish from './newDish.js';
import s3BucketURL from '../config/setting.js';
import { connect } from 'react-redux';
import { getAllDishesAsync, deleteDishAsync } from '../../js/middleware/index.js';

class RestaurantHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageUpdated: false,
            dishList: []
        }
        this.handleGetAllDishes.bind(this);
    }

    componentDidMount = () => {
        this.handleGetAllDishes();
    }

    handleGetAllDishes = () => {
        this.props.getAllDishes(localStorage.getItem('userEmail'));
        console.log('props dishlist ' + this.props.dishList);
    }

    handleDeleteDish = (e) => {
        console.log('delete dish e target ', e.target.name);
        this.props.deleteDish({
            dishCode: [e.target.name],
            restaurantEmail: localStorage.getItem('userEmail') 
        });
    }

    render() {

        return (
            <>
            <NavBar />
            
            <div className="container my-4">
            
                {/* {authenticate} */}
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
                        {this.props.dishList.map(dish => {
                            return (
                                <tr key={dish.dishCode}>
                                    <td>
                                        <img 
                                            src={s3BucketURL+dish.imageLink || ''} 
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

function mapDispatchToProps(dispatch) {
    return {
        getAllDishes: restaurantEmail => dispatch(getAllDishesAsync(restaurantEmail)) ,
        deleteDish: ({dishCode, restaurantEmail}) => { dispatch(deleteDishAsync({dishCode, restaurantEmail}))}
    }
}

function mapStateToProps(state) {
    return {
        dishList: state.dishList
    }
}

const ConnectedRestaurantHome = connect(mapStateToProps, mapDispatchToProps)(RestaurantHome);
export default ConnectedRestaurantHome;