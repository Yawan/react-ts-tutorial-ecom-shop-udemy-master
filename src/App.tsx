import "./App.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import CheckoutPage from "./containers/CheckoutPage"
import AllProductsPage from "./containers/AllProductsPage"
import HomePage from "./containers/HomePage"
import { ROUTE } from "./constants/route"
import HeaderNavigation from "./components/HeaderNavigation"

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <HeaderNavigation />
        <Routes>
          <Route path={ROUTE.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTE.ALL_PRODUCTS} element={<AllProductsPage />} />
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
