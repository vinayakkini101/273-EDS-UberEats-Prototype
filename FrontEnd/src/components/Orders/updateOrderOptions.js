function UpdateOrderOptions(props) {
    let Options = null;
    if(props.address === 'Pickup') {
        Options =  
            <>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Pickup Ready">Pickup Ready</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Picked Up" >Picked Up</button>
            </>;
    }
    else if(props.address === 'customer') {
        Options =  
            <>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="On The Way" >On The Way</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Delivered" >Delivered</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Pickup Ready" >Pickup Ready</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Picked Up" >Picked Up</button>
            </>;
    }
    else {
        Options =  
            <>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="On The Way" >On The Way</button>
            <button className="dropdown-item" onClick={props.handleUpdateClick} name="Delivered" >Delivered</button>
            </>;
    }

    return (
        <>
        <button className="dropdown-item" onClick={props.handleUpdateClick} name="Order Received">Order Received</button>
        <button className="dropdown-item" onClick={props.handleUpdateClick} name="Preparing">Preparing</button>
        {Options}
        </>
    );
}

export default UpdateOrderOptions;