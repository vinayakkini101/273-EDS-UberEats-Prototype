import React from "react";
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from "react-router";
import {Toast, Modal} from 'bootstrap';
import NavBar from "../Navbar/navbar";

class VisitRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDetails: {
                id: '',
                name: '',
                description: '',
                email: '',
                contactno: '',
                starttime: '',
                endtime: '',
                country: '',
                state: '',
                city: '',
                imageLink: '',
                imageName: '',
                restaurantEmail: props.match.params.RestaurantEmail,
                street: '',
                pickup: '',
                delivery: ''
            },
            dishList: [],
            cartItems: []
        }

        console.log('email state in visitResto ', this.state.profileDetails.restaurantEmail);
        // console.log('resto email in visitResto ', this.state.profileDetails.restaurantEmail);
    }

    componentDidMount = () => {
        this.getProfileDetails();
        this.populateDishList();
    }

    getProfileDetails = () => {
        // console.log('get prof details localstore email  ', localStorage.getItem('userEmail'));
        axios.defaults.withCredentials = true;
        axios.post('/getRestaurantProfile', {
            restaurantEmail: this.state.profileDetails.restaurantEmail
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data);
                    const details = response.data;
                    this.setState({
                        // isPageUpdated: true,
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
                            city: details.city,
                            imageLink: details.Display_Picture,
                            street: ''
                        }
                    })
                }
            })
            .catch(error => {
                console.log("get restaurant details error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get restaurant details, please try again!");
            })
    }


    populateDishList = () => {
        axios.get('/getAllDishes', {
            params: {
                restaurantEmail: this.state.profileDetails.restaurantEmail
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response.data.slice());

                    this.setState({
                        dishList: response.data.slice(),
                    });
                    
                    console.log('dish list state ',this.state.dishList);
                }
            })
            .catch(error => {
                console.log("get all dish details error");
                this.setState({
                    // isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get all dish details, please try again!");
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

            <div className='container my-4'>
                <h2>{this.state.profileDetails.name}</h2>
                <div className="row">
                    <div className="col-3 my-2">
                        <img 
                            src={this.state.profileDetails.imageLink || ''}
                            className='img-fluid img-thumbnail rounded-circle z-depth-5' 
                            alt='Display' 
                            style={{width: '15rem', height: '15rem'}}
                        />
                    </div>
                    <div className="col-9">
                        <div className="">{this.state.profileDetails.description}</div>
                        <br /><div>{this.state.profileDetails.city}, {this.state.profileDetails.state}, {this.state.profileDetails.country}</div>
                        <br /><div>Contact: {this.state.profileDetails.contactno}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: '11', color: 'green' }}>
                        <div id="successToast" className="toast" role="alert">
                            <div className="toast-header">
                            <strong className="me-auto">Awesome!</strong>
                            <small>Just now</small>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                            </div>
                            <div className="toast-body">
                            Added item to cart
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {this.state.dishList.map(dish => {
                            return <DishDisplayCard 
                                        key={dish.Dish_ID} 
                                        dishDetails={dish} 
                                        restaurantEmail={this.state.profileDetails.email}
                                        restaurantName={this.state.profileDetails.name}
                                        pickup={this.state.profileDetails.pickup}
                                        delivery={this.state.profileDetails.delivery}
                                        // restaurantStreet={this.state.profileDetails.street}
                                        // restaurantCity={this.state.profileDetails.city}
                                        triggerToast={this.triggerToast}
                                    />;
                        })}
                    </div>
                </div>
            </div>
            </>
        );
    }
}


class DishDisplayCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.dishDetails,
            restaurantEmail: props.restaurantEmail,
            quantity: 0,
            price: props.dishDetails.Price,
            isQuantityZero: false
        }
        this.triggerToast = props.triggerToast;

    }

    handleAddToCart = () => {
        // event.preventDefault();
        let cart = [];
        console.log(sessionStorage);
        if(sessionStorage.getItem('cartItems')) {
            cart = JSON.parse(sessionStorage.getItem('cartItems'));
        }
        debugger
        let itemStatus = '';
        itemStatus = this.ensureItemsFromSameRestaurant(cart);
        if(itemStatus === 'NOTADDED') {
            return;
        }
        itemStatus = this.addOrUpdateItem(cart);
        
        if(itemStatus === 'ADDED') {
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            console.log('js obj ', JSON.parse(sessionStorage.getItem('cartItems')));
            const toastElement = document.getElementById('successToast');
            const bsToast = new Toast(toastElement);
            bsToast.show();
        }
        else if(itemStatus === 'REMOVED') {
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            console.log('js obj ', JSON.parse(sessionStorage.getItem('cartItems')));
        }
    }   

    handleQuantityMinus = () => {
        console.log('add quant ', this.state.quantity);
        this.setState(state => {
            let newQuantity = state.quantity - 1;
            if(newQuantity < 0) {
                newQuantity = state.quantity;
            }
            return {quantity: newQuantity};
        });
    }

    handleQuantityAdd = () => {
        console.log('add quant ', this.state.quantity);
        this.setState(state => {
            return {quantity: state.quantity + 1};
        });
    }

    ensureItemsFromSameRestaurant = (cart) => {
        // Show modal if items from another restaurant are added
        const restaurantEmail = this.state.details.Restaurant_Email;
        for(let item of cart) {
            if(item.restaurantEmail !== restaurantEmail) {
                const cartModal = new Modal('#cartModal');
                cartModal.show();
                return 'NOTADDED';
            }
        }
        return 'ADDED';
    }

    handleQuantityLessThanOne = () => {
        // Display error if added quantity is less than 1
        if(this.state.quantity < 1) {
            this.setState({ isQuantityZero: true });
            return;
        }
    }

    addOrUpdateItem = (cart) => {
        // Update item if it already exists in the cart
        // Else add item to cart
        let isDishFound = false;
        const dishName = this.state.details.Dish_Name;
        const restaurantEmail = this.state.details.Restaurant_Email;

        for(let item of cart) {
            if(item.dishName === dishName && item.restaurantEmail === restaurantEmail) {
                if(this.state.quantity === 0) {
                    cart.splice(cart.indexOf(item), 1);
                    return 'REMOVED';
                }
                item.quantity = this.state.quantity;
                isDishFound = true;
            }
        }
        if( !isDishFound ) {
            if(this.state.quantity > 0) {
                cart.push({
                    userEmail: localStorage.getItem('userEmail'),
                    restaurantEmail: this.state.details.Restaurant_Email,
                    restaurantName: this.props.restaurantName,
                    dishName: this.state.details.Dish_Name,
                    quantity: this.state.quantity,
                    price: this.state.price,
                    dishImage: this.state.details.Dish_Image,
                    pickup: this.props.pickup,
                    delivery: this.props.delivery
                });
                this.setState({ isQuantityZero: false });
            }
            else {
                this.handleQuantityLessThanOne(cart);
                return 'NOTADDED';
            }
        }

        return 'ADDED';
    }

    acceptOtherRestaurantItem = () => {
        sessionStorage.removeItem('cartItems');
        this.handleAddToCart();
    }

    render() {
        let errorMessage = null;
        if(this.state.isQuantityZero === true) {
            errorMessage = <div className="alert alert-danger">Add atleast 1 quantity</div>;
        }
        return (
            <>
                <div className="card col-lg-3 col-md-6 col-12 g-4 m-2" style={{width: '3rem;'}}>
                    <img src={this.state.details.Dish_Image} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.details.Dish_Name}</h5>
                        <p className="card-text">{this.state.details.Description}</p>
                        <p className="card-text">Price: ${this.state.details.Price}</p>
                        <div className="input-group">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.handleQuantityMinus}>-</button>
                            <div className="form-control" name="quantity">{this.state.quantity}</div>
                            <button className="btn btn-outline-secondary" type="button" onClick={this.handleQuantityAdd}>+</button>
                        </div>
                        <button 
                            className="btn btn-primary"
                            onClick={this.handleAddToCart}
                        >
                            Add to Cart
                        </button>
                        {errorMessage}
                    </div>
                </div>


                {/* Cart Modal */}
                <div className="modal fade" tabIndex="-1" id="cartModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create New Order?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Your order contains items from another restaurant. Create a new order?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-secondary" onClick={this.acceptOtherRestaurantItem}>Okay</button>
                    </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default VisitRestaurant;