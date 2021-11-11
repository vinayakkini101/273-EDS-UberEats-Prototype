import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import NavBar from '../Navbar/navbar';
import UpdateOrderOptions from './updateOrderOptions';
import EachOrder from './eachOrder';
import { connect } from 'react-redux';
import { getOrdersAsync } from '../../js/middleware/index.js';

class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRestaurant: localStorage.getItem('isRestaurant'),
            ordersList: [],
            filteredOrdersList: []
        }
        // console.log(this.state.isRestaurant);
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.ordersList !== prevProps.ordersList) {
            this.setState({
                filteredOrdersList: this.props.ordersList
            })
        }
    }

    componentDidMount = () => {
        let customerEmail = null;
        let restaurantName = null;
        if(this.state.isRestaurant === 'true') {
            restaurantName = localStorage.getItem('userName');
            this.props.getOrders('', restaurantName);
        }
        else {
            customerEmail = localStorage.getItem('userEmail');
            this.props.getOrders(customerEmail, '');
        }
    }

    filterOrdersList = (status) => {
        console.log('in filter orders list ');
        let filteredOrdersList = this.props.ordersList.filter(order => {
            if(status.toLowerCase().includes(order.status.toLowerCase())) {
                return order;
            }
        });

        if(status === 'All' || filteredOrdersList.length === this.props.ordersList.length) {
            filteredOrdersList = this.props.ordersList.slice();
        }

        this.setState({
            filteredOrdersList: filteredOrdersList
        });
    }

    handleFilterClick = (event) => {
        console.log(event.target.name);
        this.filterOrdersList(event.target.name);
    }

    render() {
        const isRestaurant = this.state.isRestaurant === 'true';
        return (
            <>
            <NavBar />

            <div className="container">
                <div className="row mt-3 mb-5">
                    <div className="col">
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                Filter Orders
                            </button>
                                <ul className="dropdown-menu">
                                    {
                                        isRestaurant ? 
                                        <RestaurantFilter handleFilterClick={this.handleFilterClick}/> : 
                                        <CustomerFilter address={'customer'} handleFilterClick={this.handleFilterClick} />
                                    }
                                </ul>
                        </div>
                    </div>
                </div>
                                
                {(() => {
                    if(this.state.filteredOrdersList.length === 0) {
                        return <div className="alert alert-secondary">No orders for this filter value!</div>;
                    }
                })()}

                {this.state.filteredOrdersList.map(order => {
                    return (
                        <EachOrder 
                            order={order} 
                            key={order.dateTime} 
                            index={this.props.ordersList.indexOf(order)} 
                            filterOrdersList={this.filterOrdersList}
                        />
                    )
                })}
            </div>
            </>
        );
    }
}

function RestaurantFilter(props) {
    return (
        <>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="Order Received New">New</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="Delivered">Delivered</button>
            <button className="dropdown-item" onClick={props.handleFilterClick}>Cancelled</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="All">All</button>
        </>
    );
}

function CustomerFilter(props) {
    return (
        <>
        <UpdateOrderOptions address={props.address} handleFilterClick={props.handleFilterClick} />
        </>
    );
}

function mapStateToProps(state) {
    return {
        ordersList: state.orders
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOrders: (customerEmail, restaurantName) => dispatch(getOrdersAsync(customerEmail, restaurantName))
    }
}

const ConnectedOrders = connect(mapStateToProps, mapDispatchToProps)(Orders);
export default ConnectedOrders;