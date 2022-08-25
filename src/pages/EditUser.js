import { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';

const EditUser = () => {
  const { id } = useParams();
  const {
    isLoading,
    editItem,
    fetchSingleUser,
    user,
    editUser,
    message,
    showAlert,
    setAlert,
    showNotAuthorizedError
  } = useGlobalContext();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    gender: ''
  });

  useEffect(() => {
    fetchSingleUser(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (editItem) {
      setValues({
        ...editItem
      });
    }
  }, [editItem]);

  useEffect(() => {
    if (user && user.userId !== id) {
      showNotAuthorizedError();
    }
    setTimeout(() => { setAlert() }, 10000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setValues({ ...values, [e.target.name]: e.target.checked });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(id, values, user.userId);
  };
  if (isLoading && !editItem) {
    return <div className='loading'></div>;
  }

  return (
    <>
      {!user && <Redirect to='/' />}
      {user && <>
        <Navbar />
        <Container className='page'>
          <header>
            <Link to='/dashboard' className='btn btn-block back-home'>
              back home
            </Link>
          </header>
          {
            showAlert && (
              <div className='alert alert-danger'>
                {message}
              </div>
            )
          }

          {user.userId === id &&
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
              <h4>Update User</h4>
              <div className='form-container'>
                <FormRow
                  type='name'
                  name='name'
                  value={values.name}
                  handleChange={handleChange}
                />
                <FormRow
                  type='name'
                  name='email'
                  value={values.email}
                  handleChange={handleChange}
                />
                <div>
                  <label htmlFor="gender" className='form-label'>Gender</label>
                  <input type="radio" id="Male" name="gender" value="Male" checked={values.gender === 'Male' ? "checked" : ""} onChange={handleChange} />
                  <label htmlFor="Male">  Male</label>&nbsp;&nbsp;
                  <input type="radio" id="Female" name="gender" value="Female" checked={values.gender === 'Female' ? "checked" : ""} onChange={handleChange} />
                  <label htmlFor="Female">  Female</label>
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
          }
        </Container>
      </>}
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
 
  .change-password-btn {
    background-color: var(--black);
    color: #fff;
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
      grid-template-columns: 200px  220px  150px;
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
export default EditUser;
