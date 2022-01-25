import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/reducers"
import Popover from "../ui/Popover"
import "./style.scss"

interface IShoppingCartProps {}

const ShoppingCart: React.FunctionComponent<IShoppingCartProps> = (props) => {
  const { cart } = useSelector((state: RootState) => state.user)
  const [showPopover, setShowPopover] = useState(false)
  return (
    <Popover
      controlShow={showPopover}
      position="bottom-left"
      content={<div>Hello PopOver</div>}
    >
      <div className="shopping-cart-container">
        <i className="nav-item fa fa-shopping-cart"></i>
        {cart?.length ? (
          <div className="cart-shop-notifications">{cart.length}</div>
        ) : null}
      </div>
    </Popover>
  )
}

export default ShoppingCart
