function UpdateOrderOptions(props) {
    let Options = null;
    // console.log('UpdateOrderOptions resto props ', props.handleUpdateClick);
    if(props.address === 'Pickup') {
        Options =  
            <>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Order Received">Order Received</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Preparing">Preparing</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Pickup Ready">Pickup Ready</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Picked Up" >Picked Up</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Cancelled" >Cancel The Order</button>
            </>;
    }
    else if(props.address === 'customer') {
        // console.log('UpdateOrderOptions customer props ', props.handleFilterClick);
        Options =  
            <>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="Order Received">Order Received</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="Preparing">Preparing</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="On The Way" >On The Way</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="Delivered" >Delivered</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="Pickup Ready" >Pickup Ready</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="Picked Up" >Picked Up</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Cancelled" >Cancelled</button>
            <button className="dropdown-item" onClick={props.handleFilterClick} name="All" >All</button>
            </>;
    }
    else if(props.address === 'cancel-by-customer') {
        Options =  <button className="dropdown-item" onClick={props.handleUpdateClick} name="Cancelled" >Cancel</button>
    }
    else {
        Options =  
            <>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Order Received">Order Received</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Preparing">Preparing</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="On The Way" >On The Way</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Delivered" >Delivered</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Cancelled" >Cancel The Order</button>
            </>;
    }

    return (
        <>
        {Options}
        </>
    );
}

export default UpdateOrderOptions;