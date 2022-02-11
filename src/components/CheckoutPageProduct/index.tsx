import * as React from "react"
import { SIZE } from "../../constants/product"
import { ProductPurchase } from "../../store/reducers/userReducer"
import { capitalizeFirstLetter } from "../../utils/helper"
import {
  getBackgroundColorStyleForButton,
  getSubtotalPrice,
} from "../../utils/product"
import "./style.scss"
interface ICheckoutPageProductProps {
  product: ProductPurchase
}

const CheckoutPageProduct: React.FunctionComponent<
  ICheckoutPageProductProps
> = ({ product }) => {
  const { title, image, size, color, quantity } = product
  const subtotalPrice = getSubtotalPrice(product)
  const backgroundStyle: React.CSSProperties =
    getBackgroundColorStyleForButton(color)

  return (
    <div className="checkout-page-product-container">
      <div className="image-container">
        <div
          className="product-image"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="product-details">
        <p className="product-name">{title}</p>
        <p>{SIZE[size]}</p>
        <div
          className="color"
          title={capitalizeFirstLetter(color)}
          style={backgroundStyle}
        />
      </div>
      <div className="quantity">
        <p>QTY: {quantity}</p>
      </div>
      <div className="subtotal-price">Subtotal: ${subtotalPrice}</div>
    </div>
  )
}

export default CheckoutPageProduct
