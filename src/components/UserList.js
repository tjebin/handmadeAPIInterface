import React from 'react'

const UserList = ({ users }) => {
    return (
        <>
            {users.map((user) => {
                const { id, name, email, image } = user;
                return (
                    <article key={id} className='user'>
                        <img src={image} alt="avatar" width="90px" height="90px" />
                        <div>
                            <h4>{name}</h4>
                            <p>{email}</p>

                        </div>
                    </article>
                );
            })}
        </>
    )
}

export default UserList
