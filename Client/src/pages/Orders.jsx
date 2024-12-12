import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        shipping_address: {
            street: '',
            city: '',
            province: '',
            postal_code: '',
            country: ''
        },
        billing_address: {
            street: '',
            city: '',
            province: '',
            postal_code: '',
            country: ''
        },
        order_items: [],
        payment_details: {
            method: '',
            transaction_id: ''
        },
        shipping_cost: 0,
        total_cost: 0
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8000/fetch-orders');
            if (!response.ok) {
                throw new Error(`Fetch error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched data:', data);  // Debugging statement
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const createOrder = async () => {
        try {
            const response = await fetch('http://localhost:8000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            const data = await response.json();
            setOrders([...orders, data]);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const deleteOrder = async (id) => {
        try {
            await fetch(`http://localhost:8000/orders/${id}`, {
                method: 'DELETE'
            });
            setOrders(orders.filter(orders => orders._id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const [category, field] = id.split('.');

        setNewOrder((prevOrder) => ({
            ...prevOrder,
            [category]: {
                ...prevOrder[category],
                [field]: value
            }
        }));
    };

    const addItemToOrder = (item) => {
        setNewOrder({
            ...newOrder,
            order_items: [...newOrder.order_items, item]
        });
    };

    const renderOrder = (orders) => {
        console.log('Order to render:', orders);  // Debugging statement
        return (
            <li key={orders._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
                <h3>Order ID: {orders._id}</h3>
                <p>User ID: {orders.user}</p>
                <h4>Shipping Address</h4>
                <p>{orders.shipping_address.street}, {orders.shipping_address.city}, {orders.shipping_address.province || 'N/A'}, {orders.shipping_address.postal_code || 'N/A'}, {orders.shipping_address.country}</p>
                <h4>Billing Address</h4>
                <p>{orders.billing_address.street}, {orders.billing_address.city}, {orders.billing_address.province || 'N/A'}, {orders.billing_address.postal_code || 'N/A'}, {orders.billing_address.country}</p>
                <h4>Order Items</h4>
                <ul>
                    {orders.order_items.map((item, index) => (
                        <li key={index}>Product ID: {item.product}, Quantity: {item.quantity}, Price: ${item.price}</li>
                    ))}
                </ul>
                <h4>Payment Details</h4>
                <p>Method: {orders.payment_details.method}</p>
                <p>Transaction ID: {orders.payment_details.transaction_id}</p>
                <p>Shipping Cost: ${orders.shipping_cost}</p>
                <p>Total Cost: ${orders.total_cost}</p>
                <button onClick={() => deleteOrder(orders._id)}>Delete Order</button>
            </li>
        );
    };

    return (
        <div>
            <h2>Orders</h2>
            <div>
                <h3>Create New Order</h3>
                <input type="text" id="shipping_address.street" name="shipping_address.street" placeholder="Street" onChange={handleInputChange} />
                <input type="text" id="shipping_address.city" name="shipping_address.city" placeholder="City" onChange={handleInputChange} />
                <input type="text" id="shipping_address.province" name="shipping_address.province" placeholder="Province" onChange={handleInputChange} />
                <input type="text" id="shipping_address.postal_code" name="shipping_address.postal_code" placeholder="Postal Code" onChange={handleInputChange} />
                <input type="text" id="shipping_address.country" name="shipping_address.country" placeholder="Country" onChange={handleInputChange} />
                <button onClick={createOrder}>Create Order</button>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {orders.map(orders => renderOrder(orders))}
            </ul>
        </div>
    );
};

export default Orders;
