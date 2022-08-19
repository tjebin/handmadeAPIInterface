import { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';
import axios from 'axios';


function Update() {
  const { id } = useParams();
  const {
    isLoading,
    editItem,
    fetchSingleProduct,
    user,
    editProduct,
    message,
    showAlert
  } = useGlobalContext();

  const [values, setValues] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    company: '',
    category: '',
    featured: '',
    freeShipping: '',
    inventory: '',
    averageRating: 0,
    createdAt: ''
  });

  const [selectedFile, setSelectedFile] = useState("");
  const [imgSrc, setImgSrc] = useState("");


  const onFileChangeHandler = (e) => {
    e.preventDefault();

    setSelectedFile(e.target.files[0]);
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    handleChange(e);
  };

  const onClickHandler = (e) => {
    const data = new FormData();
    data.append('file', selectedFile);

    //data.append('id', item.id);
    axios.post("/products/uploadImage", data, {
    })
      .then(res => {
        editProduct(id, {
          ...values
        });
      })
      .catch(error => {
        alert(error.response.data.msg);
      })
  }

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  useEffect(() => {
    if (editItem) {
      setValues({
        ...editItem
      });
    }
  }, [editItem]);

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
    e.preventDefault();
    onClickHandler(e);
  };
  if (isLoading && !editItem) {
    return <div className='loading'></div>;
  }

  return (
    <>
      {!user && <Redirect to='/' />}
      <Navbar />
      <Container className='page'>
        <header>
          <Link to='/dashboard' className='btn btn-block back-home'>
            back home
          </Link>
        </header>
        {showAlert && (
          <div className='alert alert-danger'>
            {message}
          </div>
        )}
        <form className='form' onSubmit={handleSubmit}>
          {/* <p>{editComplete && 'Success! Edit Complete'}</p> */}
          <h4>Update Product</h4>
          {/* company */}
          <div className='form-container'>
            <FormRow
              type='name'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
            <FormRow
              type='number'
              name='price'
              value={values.price}
              handleChange={handleChange}
            />

            <FormRow
              type='number'
              name='inventory'
              value={values.inventory}
              handleChange={handleChange}
            />

            <div className='form-row'>
              <label htmlFor='category' className='form-label'>
                Category
              </label>
              <select
                name='category'
                value={values.category}
                onChange={handleChange}
                className='status'
                defaultValue='home'
              >
                <option value="home" selected>home</option>
                <option value="dining" >Dining</option>
                <option value="bedroom">bedroom</option>
                <option value="living room">Handmade Mugs</option>
              </select>
            </div>
            <div className='form-row'>
              <label htmlFor="Featured">Featured ? <br /></label>
              <input type="checkbox" name="featured" checked={values.featured} onClick={handleChange} />
            </div>
            <div>
              <label htmlFor="freeShipping">Free Shipping ? <br /></label>
              <input type="checkbox" name="freeShipping" checked={values.freeShipping} onClick={handleChange} />
            </div>
            <div>
              <span ><img src={imgSrc || `${process.env.REACT_APP_IMAGE_SERVER_URL}${values.image}`} alt="product_image" width="70px" height="70px" /></span>
              <input type="file" name="image" onChange={(e) => onFileChangeHandler(e)} className="customFile" />
            </div>
            <div>
              <label htmlFor="company">Company <br /></label>
              <select
                value={values.company}
                id='company'
                onChange={handleChange}
                name="company"
                className='status'
                defaultValue="Handmade">
                <option value="Handmade" selected>Handmade</option>
                <option value="Handmade Pots" >Handmade Pots</option>
                <option value="Handmade Bed & Bath">Handmade Bed & Bath</option>
                <option value="Handmade Mugs">Handmade Mugs</option>
              </select>
            </div>
            <div>
              <label htmlFor="company">Description <br /></label>
              <textarea
                name="description"
                rows="5"
                value={values.description}
                onChange={handleChange}
                cols="40">
              </textarea>
            </div>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              disabled={isLoading}
            >
              {isLoading ? 'Editing...' : 'Edit'}
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}


const Container = styled.section`
  header {
    margin-top: 4rem;
  }
  .form {
    max-width: var(--max-width);
    margin-top: 2rem;
  }
  .form h4 {
    text-align: center;
  }
  .form > p {
    text-align: center;
    color: var(--green-dark);
    letter-spacing: var(--letterSpacing);
    margin-top: 0;
  }
  .status {
    background: var(--grey-100);
    border-radius: var(--borderRadius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .back-home {
    text-align: center;
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.15;
    background: var(--black);
  }
  .back-home:hover {
    background: var(--grey-500);
  }
  @media (min-width: 768px) {
    .back-home {
      width: 200px;
    }
    .form h4 {
      text-align: left;
    }
    .form-container {
      display: grid;
      grid-template-columns: 200px  150px  150px;
      column-gap: 2rem;
      row-gap:1.5rem;
      align-items: center;
    }

    .form > p {
      text-align: left;
    }
    .form-row {
      margin-bottom: 0;
    }
    .submit-btn {
      align-self: end;
    }
  }
`;
export default Update;
