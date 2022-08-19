import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import FormRow from './FormRow';
import Navbar from './Navbar';
import UserList from './UserList';


const User = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { isLoading, showAlert, fetchUsers, message, setAlert, users } = useGlobalContext();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        fetchUsers();
        setTimeout(() => { setAlert() }, 10000);
    }, []);

    return (
        <main>
            <section className='container'>
                <h3>{users.length} birthdays today</h3>
                <UserList users={users} />
            </section>
        </main>
    )
}

export default User
