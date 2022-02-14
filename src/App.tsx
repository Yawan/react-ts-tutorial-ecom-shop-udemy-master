// 3rd party packages
import { Provider } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HandleAllError from "./components/HandleAllError"
import HeaderNavigation from "./components/HeaderNavigation"
import { ROUTE } from "./constants/route"
import AllProductsPage from "./containers/AllProductsPage"
import CheckoutPage from "./containers/CheckoutPage"
import HomePage from "./containers/HomePage"
import ThemeContextProvider from "./context/ThemeContext"
import { store } from "./store"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContextProvider>
          <HeaderNavigation />
          <HandleAllError>
            <Routes>
              <Route path={ROUTE.CHECKOUT} element={<CheckoutPage />} />
              <Route path={ROUTE.ALL_PRODUCTS} element={<AllProductsPage />} />
              <Route path={ROUTE.HOME} element={<HomePage />} />
              <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
            </Routes>
          </HandleAllError>
        </ThemeContextProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
