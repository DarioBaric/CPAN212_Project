const mongoose = require('mongoose');

const userSchema = {
    id: Number,
    username: String,
    email: String,
    password: String, // Typically, this would be a hashed password
    full_name: String,
    date_of_birth: String, // Can be a Date object if parsed later
    address: String,
    phone_number: String,
    created_at: String, // Can be a Date object if parsed later
    updated_at: String, // Can be a Date object if parsed later
    is_active: Boolean
  };
  
  const dummyUser = {
    id: 1,
    username: "dummy_user",
    email: "dummy.user@example.com",
    password: "hashed_dummy_password",
    full_name: "Dummy User",
    date_of_birth: "1990-01-01",
    address: "123 Fake Street, Faketown, USA",
    phone_number: "+1-555-555-0000",
    created_at: "2024-11-28T20:45:00Z",
    updated_at: "2024-11-28T20:45:00Z",
    is_active: true
  };
  