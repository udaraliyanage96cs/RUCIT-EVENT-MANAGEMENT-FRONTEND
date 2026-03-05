import {useState, useEffect} from "react"
import Dashboard from './pages/Dashboard'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './auth/PrivateRoute'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
          } />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>

      
    </>
  )
}

export default App
