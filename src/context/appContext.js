import axios from 'axios'
import '../axios'
import React, { useContext, useEffect, useReducer } from 'react'
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  SET_USER,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  DELETE_PRODUCT_ERROR,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_ERROR,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
} from './actions'
import reducer from './reducer'

const initialState = {
  user: null,
  isLoading: false,
  products: [],
  showAlert: false,
  editItem: null,
  singleProductError: false,
  editComplete: false,
  message: ''
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // register
  const register = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/auth/register`,
        {
          ...userInput,
        })

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })

      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
    } catch (error) {
      if (error.response) {
        // ✅ log status code here

      }

      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data.msg })
    }
  }

  // login
  const login = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/auth/login`, {
        ...userInput,
      })

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })

      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // logout
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT_USER })
  }

  // product
  // fetch products
  const fetchProducts = async () => {
    setLoading()
    try {
      const { data } = await axios.get(`/products`)
      console.log(data);
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products })
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_ERROR })
      logout()
    }
  }

  // create product
  const createProduct = async (userInput) => {
    userInput.user = '62f3c2248122d2951aa7c51e';

    setLoading()
    try {
      const { data } = await axios.post(`/products`, {
        ...userInput
      })

      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.product })
    } catch (err) {
      if (err.response) {
        // ✅ log status code here
        console.log(err.response.status);
        console.log(err.message);
        console.log(err.response.headers); // 👉️ {... response headers here}
        console.log(err.response.data); // 👉️ {... response data here}
      }
      dispatch({ type: CREATE_PRODUCT_ERROR, payload: err.response.data.msg })
    }
  }
  const deleteProduct = async (productId) => {
    setLoading();

    try {
      await axios.delete(`/products/${productId}`)
      fetchProducts()
    } catch (error) {
      if (error.response) {
        // ✅ log status code here
        console.log(error.response.status);
        console.log(error.message);
        console.log(error.response.headers); // 👉️ {... response headers here}
        console.log(error.response.data); // 👉️ {... response data here}
      }

      dispatch({ type: DELETE_PRODUCT_ERROR, payload: error.response.data.msg })
    }
  }

  // single product
  const fetchSingleProduct = async (productId) => {
    setLoading()
    try {
      const { data } = await axios.get(`/products/${productId}`)
      dispatch({ type: FETCH_SINGLE_PRODUCT_SUCCESS, payload: data.product })
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_PRODUCT_ERROR, payload: error.response.data.msg })

    }
  }
  const editProduct = async (productId, userInput) => {
    setLoading()
    try {
      const { data } = await axios.patch(`/products/${productId}`, {
        ...userInput,
      })
      dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data.product })
    } catch (error) {
      if (error.response) {
        // ✅ log status code here
        console.log(error.response.status);
        console.log(error.message);
        console.log(error.response.headers); // 👉️ {... response headers here}
        console.log(error.response.data); // 👉️ {... response data here}
      }
      dispatch({ type: EDIT_PRODUCT_ERROR, payload: error.response.data.msg })
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const newUser = JSON.parse(user)
      dispatch({ type: SET_USER, payload: newUser.name })
    }
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        createProduct,
        fetchProducts,
        deleteProduct,
        fetchSingleProduct,
        editProduct
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
