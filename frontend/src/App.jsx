import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { User } from './components/User'
import { Admin } from './components/Admin'
import { Login } from './components/Login'
import { Registration } from './components/Registration'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} /> 
        <Route path="admin" element={<Admin />}/>
        <Route path="login/:isAdmin" element={<Login />}/>
        <Route path="registration" element={<Registration />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App