import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGlobalContext } from '../context/appContext';

const UserList = ({ users }) => {
    const { deleteUser } = useGlobalContext();
    return (
        <>
            <Wrapper>
                {users.map((user) => {
                    const { _id, name, email, image, gender, role } = user;
                    return (
                        <>
                            <article key={_id} className='user'>
                                <img src={image} alt="avatar" width="100px" height="100px" />
                                <div>
                                    <h4>{name}</h4>
                                    <p>{email}</p>
                                    <p>{role}</p>
                                    <p>{gender}</p>
                                    <div className='action-div'>
                                        <Link to={`/editUser/${_id}`} className='edit-btn' type='button'>
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className='delete-btn'
                                            type='button'
                                            onClick={() => deleteUser(_id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </article>
                            <div className="border"></div>
                        </>
                    );
                })}
            </Wrapper >
        </>
    )
}

const Wrapper = styled.section`
    .user {
        margin:0 auto;
        width:40vw;
        display:flex;
        justify-content:center;
        column-gap: 1rem;
    }
    .border {
        border-bottom: 2px solid maroon;
        margin: 0 auto;
        width:20vw;
        margin-bottom:50px;
    }

    .edit-btn {
        color: var(--green-dark);
        border-color: transparent;
        background: transparent !important;
        outline: transparent;
        border-radius: var(--borderRadius);
        cursor: pointer;
        display: inline-block;
        appearance: none;
  }
    .delete-btn {
        color: var(--red-dark);
        border-color: transparent;
        border-radius: var(--borderRadius);
        cursor: pointer;
        background: transparent;
    }
    .edit-btn,
    .delete-btn {
        font-size: 1rem;
        line-height: 1.15;
        margin-bottom: -3px;
    }
      
   `;
export default UserList
