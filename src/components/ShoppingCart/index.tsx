import React, { Dispatch, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ROUTE } from "../../constants/route"
import { UserActionType } from "../../store/action-types"
import { UserAction } from "../../store/actions/UserAction"
import { RootState } from "../../store/reducers"
import { ProductPurchase } from "../../store/reducers/userReducer"
import ShoppingCartProduct from "../ShoppingCartProduct"
import Button from "../ui/Button"
import Popover from "../ui/Popover"
import "./style.scss"

interface IShoppingCartProps {}

const ShoppingCart: React.FunctionComponent<IShoppingCartProps> = (props) => {
  const { cart } = useSelector((state: RootState) => state.user)
  const [showPopover, setShowPopover] = useState(false)

  const dispatch: Dispatch<UserAction> = useDispatch()

  const removeFromCart = useCallback(
    (productPurchase: ProductPurchase) => {
      dispatch({
        type: UserActionType.REMOVE_FROM_CART,
        productPurchase,
      })
    },
    [dispatch]
  )

  const getAllProducts = () => {
    return cart.map((product) => (
      <ShoppingCartProduct
        key={`${product.productId}-${product.variantId}`}
        product={product}
        removeFromCart={handleRemoveFromCart}
      />
    ))
  }
  const handleRemoveFromCart = (product: ProductPurchase) => {
    // if only left last one product, close the cart after removing
    cart.length === 1 && setShowPopover(false)
    removeFromCart(product)
  }
  const navigate = useNavigate()

  const renderPopoverContent = (
    <div className="shopping-cart-container-popover">
      <div className="shopping-cart-all-products">{getAllProducts()}</div>
      <Button
        className="checkout-button"
        type="primary"
        onClick={() => {
          navigate(ROUTE.CHECKOUT)
          // automatically close PopOver after navigating to Checkout page.
          handlePopoverClick()
        }}
      >
        Checkout
      </Button>
    </div>
  )

  const handlePopoverClick = () => {
    cart.length && setShowPopover((prevState) => !prevState)
  }
  return (
    <Popover
      controlShow={showPopover}
      position="bottom-left"
      content={renderPopoverContent}
      onClick={handlePopoverClick}
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
