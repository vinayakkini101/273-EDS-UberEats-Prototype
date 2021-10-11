import React from 'react';


class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: []
        }
    }

    getCartItems = () => {
        let cart = [];
        console.log(sessionStorage);
        if(sessionStorage.getItem('cartItems')) {
            cart = JSON.parse(sessionStorage.getItem('cartItems'));
        }

        this.setState({ cartItems: cart.slice()});
    }

    render() {
        let cartTotal = 0;

        return (
            <>
            <a className="nav-link fs-5 fw-bold" href="/Cart" 
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
                onClick={this.getCartItems}
            >
                Cart
            </a>

            {/* Modal that appears when Cart button is clicked */}
            <div className="modal fade" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Your Cart</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6 dark">Dish Name</div>
                                <div className="col-3">Price</div>
                                <div className="col-3">Quantity</div>
                                {/* <div className="col-2">Total</div> */}
                            </div>
                            {this.state.cartItems.map(item => {
                                cartTotal += item.price * item.quantity
                                return (
                                    <div className="row">
                                        <div className="col-6">{item.dishName}</div>
                                        <div className="col-3">${item.price}</div>
                                        <div className="col-3">x{item.quantity}</div>
                                        {/* <div className="col-2">${item.quantity * item.price}</div> */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a className="btn btn-primary" href="/Checkout">Checkout - ${cartTotal}</a>
                    </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Cart;