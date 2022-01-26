import * as React from "react"
import { ProductPurchase } from "../../store/reducers/userReducer"
import { capitalizeFirstLetter } from "../../utils/helper"
import { getDiscountedPrice, parsePrice } from "../../utils/product"
import "./style.scss"
interface IShoppingCartProductProps {
  product: ProductPurchase
  removeFromCart(productPurchase: ProductPurchase): void
}

const ShoppingCartProduct: React.FunctionComponent<
  IShoppingCartProductProps
> = ({ product, removeFromCart }) => {
  const { title, image, size, color, quantity, discount, price } = product
  const currentPrice = discount
    ? getDiscountedPrice(price, discount)
    : parsePrice(price)

  const subtotalPrice = currentPrice * quantity

  const handleOnClickCloseButton = () => {
    removeFromCart(product)
  }
  return (
    <div className="shopping-cart-product-container">
      <div
        className="product-image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="product-details">
        <p className="product-name">{title}</p>
        <p>{size}</p>
        <p>{capitalizeFirstLetter(color)}</p>
        <p>QTY: {quantity}</p>
        <p className="subtotal">Subtotal: {subtotalPrice}</p>
      </div>
      <div className="close-button" onClick={handleOnClickCloseButton}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
  )
}

export default ShoppingCartProduct
