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

    handleQuantityMinus = (e) => {
        console.log('minus quant ', e.currentTarget.name);
        const itemName = e.currentTarget.name;
        let cartItems = this.state.cartItems.slice();
        for(let dish of cartItems) {
            if(dish.quantity === 1) {
                cartItems = cartItems.filter(item => item !== dish);
                break;
            }
            if(dish.dishName === itemName) {
                dish.quantity--;
            }
        }
        this.setState({
            cartItems: cartItems.slice()
        });
        console.log(localStorage.getItem('cartItems'));
    }

    handleQuantityAdd = (e) => {
        console.log('add quant ', e.currentTarget.name);
        const itemName = e.currentTarget.name;
        let cartItems = this.state.cartItems.slice();
        for(let dish of cartItems) {
            if(dish.dishName === itemName) {
                dish.quantity++;
            }
        }
        this.setState({
            cartItems: cartItems.slice()
        });
        console.log(localStorage.getItem('cartItems'));
    }

    updateCart = () => {
        console.log('in updatecart');
        sessionStorage.removeItem('cartItems');
        sessionStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
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
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Your Cart</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6 fw-bold">Dish Name</div>
                                <div className="col-2 fw-bold">Price</div>
                                <div className="col-4 fw-bold">Quantity</div>
                                {/* <div className="col-2">Total</div> */}
                            </div>
                            {this.state.cartItems.map(item => {
                                cartTotal += item.price * item.quantity
                                return (
                                    <div className="row" key={item.dishName}>
                                        <div className="col-6">{item.dishName}</div>
                                        <div className="col-2">${item.price}</div>
                                        <div className="col-2 text-center">{item.quantity}</div>
                                        <div className="col-2">
                                            <div className="input-group">
                                                <button className="btn" type="button" onClick={this.handleQuantityMinus} name={item.dishName}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                    </svg>
                                                </button>
                                                <button className="btn" type="button" onClick={this.handleQuantityAdd} name={item.dishName}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                    </svg>
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a 
                            className="btn btn-primary" 
                            href="/Checkout"
                            onClick={this.updateCart}
                        >Checkout - ${parseFloat(cartTotal).toFixed(2)}
                        </a>
                    </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Cart;