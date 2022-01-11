// 3rd party packages
import { Provider } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import HeaderNavigation from "./components/HeaderNavigation"
import { ROUTE } from "./constants/route"
import AllProductsPage from "./containers/AllProductsPage"
import CheckoutPage from "./containers/CheckoutPage"
import HomePage from "./containers/HomePage"
import { store } from "./store"

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
