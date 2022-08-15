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
          let date = moment(createdAt);
          date = date.format('MMMM Do, YYYY');
          return (
            <article key={id} className='product'>
              <span >{name}</span>
              <span >{price}</span>
              <span >{description}</span>
              <span >{image}</span>
              <span >{company}</span>
              <span >{category}</span>
              <span >{featured === true ? <input type="checkbox" checked="checked" disabled /> : <input type="checkbox" disabled />}</span>
              <span >{freeShipping === true ? <input type="checkbox" checked="checked" disabled /> : <input type="checkbox" disabled />}</span>

              <span >{inventory}</span>
              <span >{averageRating}</span>
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
    grid-template-columns: 1fr 1fr  1fr 1fr  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    padding: 1rem 1.5rem;
    column-gap: 1rem;
    padding: 2rem 0;
    justify-content: center;
    text-align: center;
  }

  .icon {
    background: var(--primary-500);
    display: block;
    border-radius: var(--borderRadius);
    color: var(--white);
    font-size: 2rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  span {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .position {
    font-weight: 600;
  }
  .date {
    color: var(--grey-500);
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    margin: 0.75rem auto;
    width: 100px;
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
  @media (min-width: 992px) {
    grid-template-columns: 1fr;
    .icon {
      display: none;
    }
    background: var(--white);
    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);

    .product {
      border-radius: 0;
      justify-content: left;
      text-align: left;
      border-bottom: 1px solid var(--grey-200);
   grid-template-columns: 1fr 1fr  1fr 1fr  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;      align-items: center;
      padding: 1rem 1.5rem;
      column-gap: 1rem;
      margin-bottom: 0;
    }
    .product:last-child {
      border-bottom: none;
    }
    span {
      font-size: var(--small-text);
    }
    .company,
    .position {
      font-weight: 400;
      text-transform: capitalize;
    }
    .date {
      font-weight: 400;
      color: var(--grey-500);
    }

    .status {
      font-size: var(--smallText);
    }

    .action-div {
      margin-left: 1rem;
      justify-content: left;
    }
  }
`;
const setStatusColor = (status) => {
  if (status === 'interview') return '#0f5132';
  if (status === 'declined') return '#842029';
  return '#927238';
};
const setStatusBackground = (status) => {
  if (status === 'interview') return '#d1e7dd';
  if (status === 'declined') return '#f8d7da';
  return '#f7f3d7';
};

const StatusContainer = styled.span`
  border-radius: var(--borderRadius);
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  color: ${(props) => setStatusColor(props.status)};
  background: ${(props) => setStatusBackground(props.status)};
`;


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


export default Products;
