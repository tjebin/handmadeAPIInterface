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

        return { ...state, isLoading: true, showAlert: false, editComplete: false, errorMessage: '' }
    }

    // user
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload,
        }
    }
    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            user: null,
            showAlert: true,
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
            errorMessage: ''
        }
    }

    // product

    if (action.type === FETCH_PRODUCTS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            errorMessage: '',
            editItem: null,
            singleProductError: false,
            editComplete: false,
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
            errorMessage: 'Success',
            showAlert: true,
            products: [...state.products, action.payload],
        }
    }
    if (action.type === CREATE_PRODUCT_ERROR) {
        alert(action.payload);

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            errorMessage: action.payload
        }
    }

    if (action.type === DELETE_PRODUCT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
        }
    }

    if (action.type === FETCH_SINGLE_PRODUCT_SUCCESS) {
        return { ...state, isLoading: false, editItem: action.payload, errorMessage: '' }
    }
    if (action.type === FETCH_SINGLE_PRODUCT_ERROR) {
        return { ...state, isLoading: false, editItem: '', singleProductError: true }
    }

    if (action.type === EDIT_PRODUCT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            editComplete: true,
            editItem: action.payload,
        }
    }
    if (action.type === EDIT_PRODUCT_ERROR) {
        return {
            ...state,
            isLoading: false,
            editComplete: true,
            showAlert: true,
        }
    }

    throw new Error(`no such action : ${action}`)
}

export default reducer
