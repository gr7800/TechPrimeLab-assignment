import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  if (!isAuth) {
  return <Navigate to="/login" state={{ from: location }}></Navigate>
  }

  return children
}

export default PrivateRoute 