import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Headroom from 'react-headroom'

function App() {
  return (
    <BrowserRouter>
    <Headroom>
    <div 
      style={{
      transition: 'all 1s ease-in-out',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0, 0.5)',
      width: '100%',
      }}>
      <Header />
    </div>
    </Headroom >
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App