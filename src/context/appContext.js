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
  SET_ALERT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  DELETE_USER_ERROR,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_ERROR,
  NOT_AUTHORIZED_TO_ACCESS_THIS_ROLE
} from './actions'
import reducer from './reducer'

const initialState = {
  user: null,
  users: [],
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

  const setAlert = () => {
    dispatch({ type: SET_ALERT })
  }

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

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user

      })

      localStorage.setItem(
        'user',
        JSON.stringify({ user: data.user, token: data.token })
      )

    } catch (error) {
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

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data.user
      })

      localStorage.setItem(
        'user',
        JSON.stringify({ user: data.user, token: data.token })
      )
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: error.response.data.msg })
    }
  }

  // logout
  const logout = () => {
    setTimeout(() => { localStorage.removeItem('user') }, 2000);
    dispatch({ type: LOGOUT_USER })
  }

  //fetch users
  // /api/v1/users
  const fetchUsers = async () => {
    setLoading()
    try {
      const { data } = await axios.get(`/users`)
      dispatch({ type: FETCH_USERS_SUCCESS, payload: data.users })
    } catch (error) {
      dispatch({ type: FETCH_USERS_ERROR })
      logout();
    }
  }

  const deleteUser = async (userId) => {
    setLoading();
    try {
      await axios.delete(`/users/${userId}`)
      fetchUsers()
    } catch (error) {
      dispatch({ type: DELETE_USER_ERROR, payload: error.response.data.msg })
    }
  }

  const editUser = async (userId, userInput) => {
    setLoading()
    try {
      const { data } = await axios.patch(`/users/updateUser`, {
        ...userInput,
      })
      dispatch({ type: EDIT_USER_SUCCESS, payload: data.user })

    } catch (error) {
      dispatch({ type: EDIT_USER_ERROR, payload: error.response.data.msg })
    }
  }

  const fetchSingleUser = async (userId) => {
    setLoading()
    try {
      const { data } = await axios.get(`/users/${userId}`)
      dispatch({ type: FETCH_SINGLE_USER_SUCCESS, payload: data.user })
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_USER_ERROR, payload: error.response.data.msg })
    }
  }

  // product
  // fetch products
  const fetchProducts = async () => {
    setLoading()
    try {
      const { data } = await axios.get(`/products`)
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products })
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_ERROR })
      logout()
    }
  }

  // create product
  const createProduct = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/products`, {
        ...userInput
      })

      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.product })
    } catch (err) {
      dispatch({ type: CREATE_PRODUCT_ERROR, payload: err.response.data.msg })
    }
  }
  const deleteProduct = async (productId) => {
    setLoading();
    try {
      await axios.delete(`/products/${productId}`)
      fetchProducts()
    } catch (error) {
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
      dispatch({ type: EDIT_PRODUCT_ERROR, payload: error.response.data.msg })
    }
  }

  const showNotAuthorizedError = () => {
    dispatch({ type: NOT_AUTHORIZED_TO_ACCESS_THIS_ROLE })
  }

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      const newUser = JSON.parse(user)
      dispatch({ type: SET_USER, payload: newUser.user })
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
        editProduct,
        setAlert,
        fetchUsers,
        fetchSingleUser,
        deleteUser,
        editUser,
        showNotAuthorizedError
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
