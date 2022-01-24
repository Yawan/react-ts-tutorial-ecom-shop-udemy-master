import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/reducers"
import "./style.scss"

interface IShoppingCartProps {}

const ShoppingCart: React.FunctionComponent<IShoppingCartProps> = (props) => {
  const { cart } = useSelector((state: RootState) => state.user)
  return (
    <div className="shopping-cart-container">
      <i className="nav-item fa fa-shopping-cart"></i>
      {cart?.length ? (
        <div className="cart-shop-notifications">{cart.length}</div>
      ) : null}
    </div>
  )
}

export default ShoppingCart
