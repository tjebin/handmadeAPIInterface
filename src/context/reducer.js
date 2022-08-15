import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    SET_USER,
    LOGOUT_USER,
    SET_LOADING,
    CREATE_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    CREATE_PRODUCT_ERROR,
    DELETE_PRODUCT_ERROR,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_ERROR,
    EDIT_PRODUCT_ERROR,
    EDIT_PRODUCT_SUCCESS
} from './actions'

const reducer = (state, action) => {
    if (action.type === SET_LOADING) {
        return { ...state, isLoading: true, showAlert: false, editComplete: false, message: '' }
    }

    // user
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload,
            showAlert: true,
            message: 'Successfully Registered'
        }
    }
    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            user: null,
            showAlert: true,
            message: action.payload
        }
    }

    if (action.type === SET_USER) {
        return { ...state, user: action.payload }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            user: null,
            showAlert: false,
            products: [],
            isEditing: false,
            editItem: null,
            message: ''
        }
    }

    // product

    if (action.type === FETCH_PRODUCTS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            editItem: null,
            singleProductError: false,
            editComplete: false,
            showAlert: false,
            products: action.payload,
        }
    }
    if (action.type === FETCH_PRODUCTS_ERROR) {
        return { ...state, isLoading: false }
    }
    if (action.type === CREATE_PRODUCT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            message: 'Product Successfully Created',
            showAlert: true,
            products: [...state.products, action.payload],
        }
    }
    if (action.type === CREATE_PRODUCT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            message: action.payload
        }
    }

    if (action.type === DELETE_PRODUCT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            message: action.payload
        }
    }

    if (action.type === FETCH_SINGLE_PRODUCT_SUCCESS) {
        return { ...state, isLoading: false, editItem: action.payload }
    }
    if (action.type === FETCH_SINGLE_PRODUCT_ERROR) {
        return {
            ...state,
            isLoading: false,
            editItem: '',
            singleProductError: true,
            showAlert: true,
            message: action.payload
        }
    }

    if (action.type === EDIT_PRODUCT_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            editComplete: true,
            editItem: action.payload,
            showAlert: true,
            message: 'Edit Success'
        }
    }
    if (action.type === EDIT_PRODUCT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            message: action.payload
        }
    }

    throw new Error(`no such action : ${action}`)
}

export default reducer
