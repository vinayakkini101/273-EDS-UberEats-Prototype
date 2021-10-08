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
            ordersList: []
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
                        ordersList: details.slice()
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
                                    {isRestaurant ? <RestaurantFilter /> : <CustomerFilter address={'customer'} />}
                                </ul>
                        </div>
                    </div>
                </div>

                {this.state.ordersList.map(order => {
                    return (
                        <EachOrder 
                            order={order} 
                            key={order.dateTime} 
                            index={this.state.ordersList.indexOf(order)} 
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
            <li><a className="dropdown-item" href="#">New</a></li>
            <li><a className="dropdown-item" href="#">Delivered</a></li>
            <li><a className="dropdown-item" href="#">Cancelled</a></li>
        </>
    );
}

function CustomerFilter(props) {
    return (
        <>
        <UpdateOrderOptions address={props.address} />
        </>
    );
}

export default Orders;