import { useState } from 'react'
import Header from './compoenents/Header'
import ProductOverview from './compoenents/ProductOverview'
import Footer from './compoenents/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuotePage from './compoenents/QuotePage';


function App() {

  return (
  <>


      <Router>
      <Routes>
        <Route path="" element={<ProductOverview />} />
           <Route path="/quote" element={<QuotePage />} />
      </Routes>
    </Router>
    <Footer/>


  </>
  )
}

export default App
