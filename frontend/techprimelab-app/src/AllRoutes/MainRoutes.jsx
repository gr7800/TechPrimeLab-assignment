import React from 'react'
import {Routes,Route} from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import ProjectList from '../pages/ProjectList'
import AddProject from '../pages/AddProject'
import PrivateRoute from './PrivateRoute'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path='/list' element={<ProjectList/>} />
        <Route path='/add-project' element={<AddProject/>} />
        <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default MainRoutes