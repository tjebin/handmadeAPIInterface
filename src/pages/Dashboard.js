import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import User from '../components/User'; import { MultiSelect } from "react-multi-select-component";
import { options } from '../utils.js/Colors';
import { Redirect } from 'react-router-dom';

function Dashboard() {
  const [values, setValues] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: 'home',
    company: 'Handmade',
    colors: [],
    featured: false,
    freeShipping: false,
    inventory: 0,
    averageRating: 1
  });

  const [selectedFile, setSelectedFile] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [showManageProduct, setShowManageProduct] = useState(false);
  const [showManageUser, setShowManageUser] = useState(false);
  const { isLoading, showAlert, fetchProducts, createProduct, message, setAlert, user } = useGlobalContext();

  const [selected, setSelected] = useState([]);

  const onFileChangeHandler = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    handleChange(e);
  };

  const onClickHandler = (e) => {
    const data = new FormData();
    data.append('file', selectedFile);
    axios.post("/products/uploadImage", data, {
    })
      .then(res => {
        createProduct(values);
      })
      .catch(error => {
        alert(error.response.data.msg);
      })
  }

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setValues({ ...values, [e.target.name]: e.target.checked });
    } else if (e.target.type === 'file') {
      setValues({ ...values, image: e.target.files[0].name });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    if (selected) {
      let colorsArray = selected.map((element) => {
        let color = Object.values(element)[1];
        return color;
      })
      setValues({ ...values, 'colors': colorsArray });
    }

    e.preventDefault();
    onClickHandler(e);
  };

  useEffect(() => {
    fetchProducts();
    setTimeout(() => { setAlert() }, 10000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!user && <Redirect to='/home' />}

      <Navbar />
      <Wrapper className='page'>
        {showAlert && (
          <div className='alert alert-danger'>
            {message}
          </div>
        )}
        <div className="list-button">
          <h2 onClick={() => {
            setShowManageProduct(true);
            setShowManageUser(false)
          }}> Product</h2>
          <h2 onClick={() => {
            setShowManageUser(!showManageUser)
            setShowManageProduct(false);
          }} >Users</h2>
        </div>
        {showManageProduct &&
          <>
            <form className='product-form' onSubmit={handleSubmit}>
              {/* name */}
              <FormRow
                type='name'
                name='name'
                value={values.name}
                handleChange={handleChange}
                vertical
                placeholder='Name'
              />
              <div>
                <div className='form-label'>Colors:</div>
                <MultiSelect
                  options={options}
                  name="colors"
                  value={selected}
                  onChange={setSelected}
                  labelledBy={"Select"}
                  isCreatable={true}
                  className="form-input"
                />
              </div>
              <FormRow
                type='number'
                name='price'
                value={values.price}
                handleChange={handleChange}
                vertical
                placeholder='Price'
              />
              <FormRow
                type='name'
                name='description'
                value={values.description}
                handleChange={handleChange}
                vertical
                placeholder='Description'
              />
              <div>
                <img src={imgSrc} alt="product_image" width="70px" height="70px" /><br />
                <input type="file" name="image" onChange={(e) => onFileChangeHandler(e)} className="customFile" />
              </div>
              <div>
                <label htmlFor="company">Company <br /></label>
                <select
                  value={values.company || 'Handmade'}
                  id='company'
                  onChange={handleChange}
                  name="company"
                >
                  <option value="Handmade" >Handmade</option>
                  <option value="Handmade Pots" >Handmade Pots</option>
                  <option value="Handmade Bed & Bath">Handmade Bed & Bath</option>
                  <option value="Handmade Mugs">Handmade Mugs</option>
                </select>
              </div>
              <div>
                <label htmlFor="category">Category <br /></label>
                <select
                  name="category"
                  value={values.category || 'home'}
                  onChange={handleChange}
                >
                  <option value="home">home</option>
                  <option value="dining" >dining</option>
                  <option value="bedroom">bedroom</option>
                  <option value="living room">living room</option>
                </select>
              </div>
              <div className='form-row'>
                <label htmlFor="Featured">Featured ? <br /></label>
                <input type="checkbox" name="featured" onClick={handleChange} />
              </div>
              <div>
                <label htmlFor="freeShipping">Free Shipping ? <br /></label>
                <input type="checkbox" name="freeShipping" onClick={handleChange} />
              </div>
              <FormRow
                type='number'
                name='inventory'
                value={values.inventory}
                handleChange={handleChange}
                vertical
                placeholder='Inventory'
                className="form-input"
              />
              <FormRow
                type='number'
                name='averageRating'
                value={values.averageRating}
                handleChange={handleChange}
                vertical
                placeholder='Average Rating'
                className="form-input"
              />
              <FormRow
                type='number'
                name='stars'
                value={values.stars}
                handleChange={handleChange}
                vertical
                placeholder='Stars'
              />
              <button type='submit' className='btn' disabled={isLoading}>
                {isLoading ? 'Adding New Product...' : 'Add Product'}
              </button>
            </form>
            <Products />
          </>
        }
        {showManageUser &&
          <User />
        }
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
      .list-button {
        display :flex;
        column-gap: 1.5rem;
        justify-content:left;
        h2 {
          border-bottom:4px solid maroon;
        }
      }
     padding: 3rem 0;
    .product-form {
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
  
    input[type=file]::file-selector-button {
      font-weight: bold;
      color: dodgerblue;
      padding: 0.5em;
      border: thin solid grey;
      border-radius: 3px;
    }

    input[type=file]::file-selector-button:hover {
      background-color: #81ecec;
      border: 2px solid #00cec9;
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
   `;

export default Dashboard;
