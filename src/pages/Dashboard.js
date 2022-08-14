import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';
import Products from '../components/products';

function Dashboard() {
  const [values, setValues] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: 'home',
    company: 'Handmade',
    colors: '',
    featured: false,
    freeShipping: false,
    inventory: 0,
    averageRating: 1
  });

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {

      setValues({ ...values, [e.target.name]: e.target.checked });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });

    }

  };

  const { isLoading, showAlert, fetchProducts, createProduct, errorMessage } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(values);

  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar />
      <Wrapper className='page'>
        {showAlert && (
          <div className='alert alert-danger'>
            {errorMessage}
          </div>
        )}
        <h2>Product</h2>

        <form className='job-form' onSubmit={handleSubmit}>

          {/* name */}
          <FormRow
            type='name'
            name='name'
            value={values.name}
            handleChange={handleChange}
            vertical
            placeholder='Name'
          />
          {/* price */}
          <FormRow
            type='number'
            name='price'
            value={values.price}
            handleChange={handleChange}
            vertical
            placeholder='Price'
          />
          {/* description */}
          <FormRow
            type='name'
            name='description'
            value={values.description}
            handleChange={handleChange}
            vertical
            placeholder='Description'
          />

          <FormRow
            type='name'
            name='image'
            value={values.image}
            handleChange={handleChange}
            vertical
            placeholder='Image'
          />

          <div>
            <label htmlFor="company">Company <br /></label>
            <select
              value={values.company}
              id='company'
              onChange={handleChange}
              name="company">
              <option value="Handmade" selected>Handmade</option>
              <option value="Handmade Pots" >Handmade Pots</option>
              <option value="Handmade Bed & Bath">Handmade Bed & Bath</option>
              <option value="Handmade Mugs">Handmade Mugs</option>
            </select>
          </div>
          <div>
            <label htmlFor="category">Category <br /></label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              <option value="home" selected>home</option>
              <option value="Dining" >Dining</option>
              <option value="bedroom">bedroom</option>
              <option value="Living Room">Handmade Mugs</option>
            </select>
          </div>

          <div className='form-row'>
            <label htmlFor="Featured">Featured ? <br /></label>
            <input type="checkbox" name="featured" onClick={handleChange} />
          </div>
          <div>
            <label for="freeShipping">Free Shipping ? <br /></label>
            <input type="checkbox" name="freeShipping" onClick={handleChange} />
          </div>
          <FormRow
            type='number'
            name='inventory'
            value={values.inventory}
            handleChange={handleChange}
            vertical
            placeholder='Inventory'
          />
          <FormRow
            type='number'
            name='averageRating'
            value={values.averageRating}
            handleChange={handleChange}
            vertical
            placeholder='Average Rating'
          />

          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'Adding New Product...' : 'Add Product'}
          </button>
        </form>

        {/* <Products /> */}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
     padding: 3rem 0;

    .job-form {
        background: var(--white);
        display: grid;
        row-gap: 1rem;
        column-gap: 0.5rem;
        align-items: center;
        margin-bottom: 3rem;
        border-radius: var(--borderRadius);
        padding: 1.5rem;
        h2 {
          text-align:center;
    }
    
    .form-input {
        padding: 0.75rem;
    }

    .form-input:focus {
          outline: 1px solid var(--primary-500);
    }
    .form-row {
          margin-bottom: 0;
    }
    .btn {
          padding: 0.75rem;
    }

    select {
       padding: 10px; 
       background: #edf2ff;
       border: none;     
    }

    @media (min-width: 776px) {
        grid-template-columns: 1fr 1fr auto;
        .btn {
          height: 100%;
          padding: 0 2rem;
        }
         column-gap: 2rem;
    }
  }
    .alert {
        max-width: var(--max-width);
        margin-bottom: 1rem;
  }
   `;

export default Dashboard;
