import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import CheckoutPageProduct from "../../components/CheckoutPageProduct"
import CustomerInfo from "../../components/CustomerInfo"
import { ROUTE } from "../../constants/route"
import { RootState } from "../../store/reducers"
import { getSubtotalPrice } from "../../utils/product"
import "./style.scss"

interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (props) => {
  const { cart } = useSelector((state: RootState) => state.user)

  const getCartDetails = () => {
    // contain divider line between products
    const cartItems: React.ReactNode[] = []
    let totalPrice = 0

    cart.forEach((product, index) => {
      if (index > 0) {
        cartItems.push(<div key={`divider-${index}`} className="divider" />)
      }
      cartItems.push(
        <CheckoutPageProduct
          product={product}
          key={`${product.productId}-${product.variantId}`}
        />
      )
      totalPrice += getSubtotalPrice(product)
    })

    return {
      cartItems,
      totalPrice,
    }
  }
  const { cartItems, totalPrice } = getCartDetails()
  return cart.length ? (
    <div className="checkout-page-container">
      <div className="cart-items-container">
        <div className="cart-items-header">
          <p>Items: {cart.length}</p>
          <div className="shipping-container">
            <i className="fa fa-truck" aria-hidden="true"></i>
            <label>Free Shipping</label>
          </div>
        </div>
        <div className="cart-items">{cartItems}</div>
        <div className="cart-items-footer">
          <div className="text">Total</div>
          <div className="total-price">${totalPrice}</div>
        </div>
      </div>
      <CustomerInfo cart={cart} />
    </div>
  ) : (
    // v6 modification, replace <Redirect /> in router v5 to <Navigation />.
    <Navigate replace to={ROUTE.HOME} />
  )
}

export default CheckoutPage
