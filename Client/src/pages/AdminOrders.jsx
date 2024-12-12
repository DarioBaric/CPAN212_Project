import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        shipping_address: {
            street: '',
            city: '',
            state: '',
            zip_code: '',
            country: ''
        },
        billing_address: {
            street: '',
            city: '',
            state: '',
            zip_code: '',
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
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await fetch('http://localhost:8000/orders', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error(`Fetch error: ${response.status}`);
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Expected an array in response data');
            }
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const createOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await fetch('http://localhost:8000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            await fetch(`http://localhost:8000/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(orders.filter(order => order._id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({
            ...newOrder,
            [name]: value
        });
    };

    const addItemToOrder = (item) => {
        setNewOrder({
            ...newOrder,
            order_items: [...newOrder.order_items, item]
        });
    };

    return (
        <div>
            <h2>Orders</h2>
            <div>
                <h3>Create New Order</h3>
                <input type="text" name="shipping_address.street" placeholder="Street" onChange={handleInputChange} />
                <input type="text" name="shipping_address.city" placeholder="City" onChange={handleInputChange} />
                <input type="text" name="shipping_address.state" placeholder="State" onChange={handleInputChange} />
                <input type="text" name="shipping_address.zip_code" placeholder="Zip Code" onChange={handleInputChange} />
                <input type="text" name="shipping_address.country" placeholder="Country" onChange={handleInputChange} />
                <button onClick={createOrder}>Create Order</button>
            </div>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        <p>Order ID: {order._id}</p>
                        <p>Order Date: {order.order_date}</p>
                        <button onClick={() => deleteOrder(order._id)}>Delete Order</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
