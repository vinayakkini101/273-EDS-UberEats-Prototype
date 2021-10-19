import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import NavBar from '../Navbar/navbar';
import UpdateOrderOptions from './updateOrderOptions';
import EachOrder from './eachOrder';

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

    componentDidMount = () => {
        let customerEmail = null;
        let restaurantName = null;
        if(this.state.isRestaurant === 'true') {
            restaurantName = localStorage.getItem('userName');
        }
        else {
            customerEmail = localStorage.getItem('userEmail');
        }
        axios.defaults.withCredentials = true;
        axios.post('/getOrders', {
            customerEmail: customerEmail,
            restaurantName: restaurantName
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("getOrders response ", response.data);
                    const details = response.data;
                    this.setState({
                        ordersList: details.slice(),
                        filteredOrdersList: details.slice()
                    })
                }
            })
            .catch(error => {
                console.log("add order error");
                this.setState({
                    isPageUpdated: "false"
                });
                console.log(error);
                alert("Unable to add order, please try again!");
            })
    }

    filterOrdersList = (status) => {
        console.log('in filter orders list ');
        let filteredOrdersList = this.state.ordersList.filter(order => {
            if(status.toLowerCase().includes(order.status.toLowerCase())) {
                return order;
            }
        });

        if(status === 'All' || filteredOrdersList.length === this.state.ordersList.length) {
            filteredOrdersList = this.state.ordersList.slice();
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
                            index={this.state.ordersList.indexOf(order)} 
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

export default Orders;