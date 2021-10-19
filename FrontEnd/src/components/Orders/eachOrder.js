import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import UpdateOrderOptions from './updateOrderOptions';

class EachOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRestaurant: localStorage.getItem('isRestaurant'),
            dishDetails: [],
            orderStatus: ''
        }
    }

    componentDidMount = () => {
        this.getOrderStatus();
    }

    getOrderedDishes = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getOrderedDishes', {
            userEmail: this.props.order.userEmail,
            orderDateTime: this.props.order.dateTime
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("getOrderedDishes response ", response.data);
                    const details = response.data;
                    this.setState({
                        dishDetails: details.orderedDishes.slice()
                    })
                    console.log('after setstate dishDetails ', this.state.dishDetails);
                }
            })
            .catch(error => {
                console.log("get ordered dishes error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to get ordered dishes, please try again!");
            })
    }

    handleUpdateClick = (event)  => {
        // console.log('in handleupdateclick');
        this.updateOrderStatus(event.target.name);
    }

    updateOrderStatus = (newStatus) => {
        axios.defaults.withCredentials = true;
        axios.post('/updateOrderStatus', {
            userEmail: this.props.order.userEmail,
            orderDateTime: this.props.order.dateTime,
            newStatus: newStatus
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("updateOrderStatus response ", response.data);
                    // const details = response.data;
                    this.setState({
                        orderStatus: newStatus
                    })
                }
            })
            .catch(error => {
                console.log("updateOrderStatus error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to updateOrderStatus, please try again!");
            })
    }

    getOrderStatus = () => {
        axios.defaults.withCredentials = true;
        axios.post('/getOrderStatus', {
            userEmail: this.props.order.userEmail,
            orderDateTime: this.props.order.dateTime
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("getOrderStatus response ", response.data);
                    const details = response.data;
                    this.setState({
                        orderStatus: details.status
                    })
                }
            })
            .catch(error => {
                console.log("getOrderStatus error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to getOrderStatus, please try again!");
            })
    }

    render() {
        const isRestaurant = this.state.isRestaurant === 'true';
        let orderTitle = null;
        let userProfile = null;
        if(isRestaurant) {
            orderTitle = <h5 className="card-title">{this.props.order.userName}</h5>;
            userProfile = <Link to={{pathname: `/CustomerProfile/${this.props.order.userEmail}`}}>
                            View {this.props.order.userName}'s profile
                        </Link>;
        }
        else {
            orderTitle = <h5 className="card-title">{this.props.order.restaurantName}</h5>;
        }
        let orderTotal = 0;
        return (
            <>
            <div className="row">
                <div className="col-10">
                    <div className="card border-dark mb-3">
                        <div
                            onClick={this.getOrderedDishes}
                            data-bs-toggle="modal" 
                            data-bs-target={"#modalNumber"+this.props.index}
                        >
                            <div className="row g-0 align-items-center">
                                <div className="col-10">
                                    <div className="card-body">
                                        {orderTitle}
                                        <p className="card-text mb-0">
                                            <small className="text-muted">
                                                Order Time : {this.props.order.dateTime}
                                            </small>
                                        </p>
                                        <small className="text-muted">Delivery Address : {this.props.order.address}</small>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <p className="text-center fw-bold">Status : {this.state.orderStatus}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="card-footer">
                                {userProfile}
                        </div>
                    </div>
                </div>
                {isRestaurant ? <UpdateOrderDropdown 
                                        address={this.props.order.address} 
                                        handleUpdateClick={this.handleUpdateClick}
                                        /> : null}
            </div>


            <div className="modal fade" tabIndex="-1" id={"modalNumber"+this.props.index}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h5 className="modal-title" id="exampleModalLabel">#Receipt</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <h6>Time : {this.props.order.dateTime}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-end fw-bold">Order Status : {this.state.orderStatus}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 fw-bold">Dish Name</div>
                                    <div className="col-2 fw-bold">Price</div>
                                    <div className="col-2 fw-bold">Quantity</div>
                                    <div className="col-2 fw-bold">Item Total</div>
                                </div>
                                {this.state.dishDetails.map(item => {
                                    orderTotal += item.quantity * item.price;
                                    return (
                                        <div className="row" >
                                            <div className="col-6">{item.dishName}</div>
                                            <div className="col-2">${item.price}</div>
                                            <div className="col-2">x{item.quantity}</div>
                                            <div className="col-2">${item.quantity * item.price}</div>
                                        </div>
                                    );
                                })}

                                <div className="row mt-3">
                                    <div className="col">
                                        <div className="fw-bold">Delivery Address</div>
                                        <p>{this.props.order.address}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="fw-bold">Email</div>
                                        <p>{this.props.order.userEmail}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    <div className="modal-footer">
                        Order Total : ${parseFloat(orderTotal).toFixed(2)}
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

        
            </>
        );
    }
}


function UpdateOrderDropdown(props) {
    return (
        <>
        <div className="col-2">
            <div className="btn-group">
                <button type="button" className="btn btn-success">Update</button>
                <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                </button>
                <ul className="dropdown-menu">
                    <UpdateOrderOptions address={props.address} handleUpdateClick={props.handleUpdateClick}/>
                </ul>
            </div>
        </div>
        </>
    );
}


export default EachOrder;