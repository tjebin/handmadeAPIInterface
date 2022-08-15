import React from 'react';
import styled from 'styled-components';

const ProductColumns = () => {
  return (
    <WrapperColumn>
      <span>name</span>
      <span>price</span>
      <span>description</span>
      <span>image</span>
      <span>company</span>
      <span>category</span>
      <span>featured</span>
      <span>free shipping?</span>
      <span>inevtory</span>
      <span>rating</span>
      <span>created at</span>
      <span className='action'>action</span>
    </WrapperColumn>
  );
};


const WrapperColumn = styled.section`
  display: none;
  @media (min-width: 992px) {
    display: block;
    background: var(--grey-200);
    color: var(--grey-500);
    border-top-left-radius: var(--borderRadius);
    border-top-right-radius: var(--borderRadius);
    display: grid;
    grid-template-columns: 1fr 1fr  1fr 1fr  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    padding: 1rem 1.5rem;
    column-gap: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    font-size: var(--small-text);
    font-weight: 600;
    .action {
      margin-left: 1rem;
    }
  }
`;

export default ProductColumns;
