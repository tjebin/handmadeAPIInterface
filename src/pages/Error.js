import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import img from '../assets/not-found.png';
const Error = () => {
  return (
    <Wrapper className='page full-page'>
      <div>
        <img src={img} alt="not_found" />
        <p><Link to="/dashboard"> To Dashboard</Link></p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }

`;

export default Error;
