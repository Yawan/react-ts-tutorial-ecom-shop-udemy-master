import * as React from "react"
import { ProductVariantsCompleteDetails } from "../../store/reducers/shopReducer"
import { getDiscountedPrice } from "../../utils/product"
interface IPriceUIProps {
  selectedVariant: ProductVariantsCompleteDetails
}

const Price: React.FunctionComponent<IPriceUIProps> = ({ selectedVariant }) => {
  const { price, discount } = selectedVariant
  return (
    <p className="price-ui">
      {discount ? (
        <React.Fragment>
          <del className="old-price">{price}</del>
          <ins>${getDiscountedPrice(price, discount)}</ins>
        </React.Fragment>
      ) : (
        <ins>${price}</ins>
      )}
    </p>
  )
}

export default Price
