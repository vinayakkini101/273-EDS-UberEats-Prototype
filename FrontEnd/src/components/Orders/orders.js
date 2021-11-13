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
            filteredOrdersList: [],
            filterDropdownSelection: 'All',
            orderCountOnPage: 5,
            currentPage: 1
        }
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
        this.setState({
            filterDropdownSelection: event.target.name
        })
        this.filterOrdersList(event.target.name);
    }

    handleFieldInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCurrentPage = (e) => {
        this.setState({
            currentPage: parseInt(e.target.innerText)
        })
    }

    render() {
        const isRestaurant = this.state.isRestaurant === 'true';
        const count = parseInt(this.state.orderCountOnPage);
        const startOrder = count * this.state.currentPage - count;
        const endOrder = Math.min(startOrder + count - 1, this.state.filteredOrdersList.length - 1);
        return (
            <>
            <NavBar />

            <div className="container">
                <div className="row mt-3 mb-5">
                    <div className="col-2">
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                Filter Orders
                            </button>
                                <ul className="dropdown-menu">
                                    {
                                        isRestaurant ? 
                                        <RestaurantFilter handleFilterClick={this.handleFilterClick}/> : 
                                        <CustomerFilter 
                                            address={'customer'} 
                                            handleFilterClick={this.handleFilterClick} 
                                            currentSelection={this.state.filterDropdownSelection}     
                                        />
                                    }
                                </ul>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="row justify-content-end">
                            <div className="col-11">
                                <Pagination 
                                    pageCount={this.state.filteredOrdersList.length / this.state.orderCountOnPage + 1} 
                                    handleCurrentPage={this.handleCurrentPage}
                                    currentPage={this.state.currentPage}
                                />
                            </div>
                            <div className="col-1">
                                <select 
                                    class="form-select form-select-md mb-3"
                                    onChange={this.handleFieldInput}
                                    name='orderCountOnPage'
                                    value={this.state.orderCountOnPage}
                                >
                                    <option value="2">2</option>
                                    <option selected value="5">5</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {(() => {
                    if(this.state.filteredOrdersList.length === 0) {
                        return <div className="alert alert-secondary">No orders for this filter value!</div>;
                    }
                })()}

                {this.state.filteredOrdersList.map((order,index) => {
                    if(index >= startOrder && index <= endOrder){
                        return ( 
                            <EachOrder 
                                order={order} 
                                key={order.dateTime} 
                                index={this.props.ordersList.indexOf(order)} 
                                filterOrdersList={this.filterOrdersList}
                            />
                        )
                    }
                    else
                        return null;
                })}

                <div className="row text-end">
                    <div className="row justify-content-end">
                        <div className="col-11">
                            <Pagination 
                                pageCount={this.state.filteredOrdersList.length / this.state.orderCountOnPage + 1} 
                                handleCurrentPage={this.handleCurrentPage}
                                currentPage={this.state.currentPage}
                            />
                        </div>
                        <div className="col-1">
                            <select 
                                class="form-select form-select-md mb-3"
                                onChange={this.handleFieldInput}
                                name='orderCountOnPage'
                                value={this.state.orderCountOnPage}
                            >
                                <option value="2">2</option>
                                <option selected value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                </div>
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
            <button className="dropdown-item" onClick={props.handleFilterClick} name="Cancelled">Cancelled</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="All">All</button>
        </>
    );
}

function CustomerFilter(props) {
    return (
        <>
        <UpdateOrderOptions 
            address={props.address} 
            handleFilterClick={props.handleFilterClick} 
            currentSelection={props.currentSelection}
        />
        </>
    );
}

function Pagination(props) {
    let pageLinks = [];
    for(let page=1; page<=props.pageCount; page++) {
        pageLinks[page] = <li className={props.currentPage === page ? 'page-item active': 'page-item'}>
                            <button className="page-link" onClick={props.handleCurrentPage}>{page}</button>
                          </li>;
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
                {/* <li className="page-item"><a className="page-link" href="#">Previous</a></li> */}
                {pageLinks.map(pageLink => pageLink)}
                {/* <li className="page-item"><a className="page-link" href="#">Next</a></li> */}
            </ul>
        </nav>
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