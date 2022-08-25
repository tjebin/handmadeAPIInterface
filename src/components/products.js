import { useGlobalContext } from '../context/appContext';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import moment from 'moment';

const Products = () => {
  const { products, isLoading, deleteProduct } = useGlobalContext();
  if (isLoading) {
    return <div className='loading'></div>;
  }

  if (products.length < 1) {
    return (
      <EmptyContainer>
        <h5>
          Currently, you have no <span>PRODUCTS </span>
          to display
        </h5>
      </EmptyContainer>
    );
  }
  return (
    <>
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
      <Container>
        {products.map((item) => {
          const { _id: id, name, price, description, image, company, category, featured, freeShipping, inventory, averageRating, createdAt } = item;
          let imageSrc = `${process.env.REACT_APP_IMAGE_SERVER_URL}${image}`;
          let date = moment(createdAt);
          date = date.format('MMMM Do, YYYY');
          return (
            <article key={id} className='product'>
              <span className="sm-display">{name}</span>
              <span >{price}</span>
              <span style={{ overflow: "hidden" }}>{description}</span>
              <span ><img src={imageSrc} alt="product_image" width="70px" height="70px" /></span>
              <span > {company}</span>
              <span >{category}</span>
              <span className="sm-display-none">{featured === true ? <input type="checkbox" defaultChecked={true} disabled /> : <input type="checkbox" disabled />}</span>
              <span className="sm-display-none">{freeShipping === true ? <input type="checkbox" defaultChecked={true} disabled /> : <input type="checkbox" defaultChecked disabled />}</span>
              <span className="sm-display-none">{inventory}</span>
              <span className="sm-display-none">{averageRating}</span>
              <span className='date'>{date}</span>
              <div className='action-div'>
                <Link to={`/edit/${id}`} className='edit-btn' type='button'>
                  <FaEdit />
                </Link>
                <button
                  className='delete-btn'
                  type='button'
                  onClick={() => deleteProduct(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })}
      </Container>
    </>
  );
};
const EmptyContainer = styled.section`
    text-align: center;
    h5 {
     text-transform: none;
    }
    span {
      color: var(--primary-500);
    }
`;
const Container = styled.section`
  .product {
    background: var(--white);
    border-radius: var(--borderRadius);
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr ;      
    align-items: center;
    padding: 1rem 1.5rem;
    column-gap: 1rem;
    padding: 2rem 0;
    justify-content: center;
    text-align: left;
    font-weight: 400;
    .sm-display-none {
      display: none;
    }
    .sm-display {
      border-bottom : 4px solid green;
      width:30%;
    }
  }
  span {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .date {
    color: var(--grey-500);
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
  .action-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1040px) {
    grid-template-columns: 1fr;
    background: var(--white);
    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);
    .product {
      border-radius: 0;
      justify-content: left;
      text-align: left;
      border-bottom: 1px solid var(--grey-200);
      grid-template-columns: 1fr 1fr  1fr 1fr  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;      
      align-items: center;
      padding: 1rem 1.5rem;
      column-gap: 1rem;
      font-weight:100;
      .sm-display-none {
          display: block;
      }
      .sm-display {
        border :none;
      } 
    }
    .product:last-child {
      border-bottom: none;
    }
    span {
      font-size: var(--small-text);
    }
    .action-div {
      margin-left: 1rem;
      justify-content: left;
    }
  }
`;

const WrapperColumn = styled.section`
  display: none;
  @media (min-width: 1040px) {
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

export default Products;