import React from 'react'
import { useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import UserList from './UserList';

const User = () => {
    const { showAlert, fetchUsers, message, setAlert, users } = useGlobalContext();
    useEffect(() => {
        fetchUsers();
        setTimeout(() => { setAlert() }, 10000);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <main>
            <section className='container'>
                {showAlert && (
                    <div className='alert alert-danger'>
                        {message}
                    </div>
                )}
                <h3>{users.length} people found</h3>
                <UserList users={users} />
            </section>
        </main>
    )
}

export default User
