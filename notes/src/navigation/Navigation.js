import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import PrivateNavigation from './PrivateNavigation'
import PublicNavigation from './PublicNavigation'


function Navigation() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PrivateNavigation><Home/></PrivateNavigation>}></Route>
    </Routes>
    <Routes>
      <Route path='/SignUp' element={<PublicNavigation><SignUp/></PublicNavigation>}></Route>
    </Routes>
    <Routes>
      <Route path='/login' element={<PublicNavigation><Login/></PublicNavigation>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Navigation