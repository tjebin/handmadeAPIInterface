import axios from 'axios'
import '../axios'
import React, { useContext, useEffect, useReducer } from 'react'
import {

} from './actions'
import reducer from './reducer'

const initialState = {

}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {

  }, [])
  return (
    <AppContext.Provider
      value={{

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
