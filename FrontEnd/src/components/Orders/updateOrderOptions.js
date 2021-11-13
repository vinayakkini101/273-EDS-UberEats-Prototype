function UpdateOrderOptions(props) {
    let Options = null;
    const restaurantDeliveryOptions = ['Order Received', 'Preparing', 'On The Way', 'Delivered', 'Cancelled'];
    const restaurantPickupOptions = ['Order Received', 'Preparing', 'Pickup Ready', 'Picked Up', 'Cancelled'];
    const customerOptions = ['Order Received', 'Preparing', 'On The Way', 'Delivered', 'Pickup Ready', 'Picked Up', 'Cancelled', 'All'];
    if(props.address === 'Pickup') {
        Options =  
            restaurantPickupOptions.map(buttonName => 
                <Button 
                    buttonClass='dropdown-item'
                    handleUpdateClick={props.handleUpdateClick}
                    name={buttonName}
                />
            );
    }
    else if(props.address === 'customer') {
        Options =  
            customerOptions.map(buttonName => 
                <Button 
                    buttonClass={props.currentSelection === buttonName ? 'dropdown-item active':  'dropdown-item'}
                    handleUpdateClick={props.handleFilterClick}
                    name={buttonName}
                />
            );
    }
    else if(props.address === 'cancel-by-customer') {
        Options = <Button buttonClass='dropdown-item' handleUpdateClick={props.handleUpdateClick} name='Cancelled' />
    }
    else {
        Options =  
            restaurantDeliveryOptions.map(buttonName => 
                <Button 
                    buttonClass='dropdown-item'
                    handleUpdateClick={props.handleUpdateClick}
                    name={buttonName}
                />
            );
    }

    return (
        <>
        {Options}
        </>
    );
}

function Button(props) {
    return <button className={props.buttonClass} onClick={props.handleUpdateClick} name={props.name}>{props.name}</button>;
}

export default UpdateOrderOptions;