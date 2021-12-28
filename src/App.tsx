// 3rd party packages
import createSagaMiddleware from "@redux-saga/core"
import { Provider } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { applyMiddleware, createStore } from "redux"

import "./App.css"
import HeaderNavigation from "./components/HeaderNavigation"
import { ROUTE } from "./constants/route"
import AllProductsPage from "./containers/AllProductsPage"
import CheckoutPage from "./containers/CheckoutPage"
import HomePage from "./containers/HomePage"
import { ProductDetailActionType } from "./store/action-types"
import { rootReducer } from "./store/reducers"
import rootSaga from "./store/sagas"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

store.dispatch({ type: ProductDetailActionType.FETCH })
;(window as any).shospree = store

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
