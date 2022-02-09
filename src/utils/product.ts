import { ProductVariantsCompleteDetails } from "../store/reducers/shopReducer"
import { ProductPurchase } from "../store/reducers/userReducer"
import { Product } from "./../store/reducers/shopReducer"
import { omit } from "./helper"

export type initialVariant = ProductVariantsCompleteDetails | null

export interface VariantsAvailableOptions {
  [sizes: string]: string[]
}
export interface GetProductVariantDetails {
  initialVariant: initialVariant
  variants: ProductVariantsCompleteDetails[]
  variantsAvailableOptions: VariantsAvailableOptions
}

export const getProductVariantDetails = (
  product: Product
): GetProductVariantDetails => {
  let initialVariant: initialVariant = null
  let foundInitialVariant: boolean = false
  const variants: ProductVariantsCompleteDetails[] = []
  const variantsAvailableOptions: VariantsAvailableOptions = {}

  product.variants.forEach((variant) => {
    const completeDetails: ProductVariantsCompleteDetails = {
      ...omit(variant, ["id"]),
      ...omit(product, ["id", "variants"]),
      productId: product.id,
      variantId: variant.id,
    }

    if (!foundInitialVariant && variant.stock) {
      foundInitialVariant = true
      initialVariant = completeDetails
    }

    if (variant.stock) {
      const variantSizeData = variantsAvailableOptions[variant.size]

      // if the variant is defined but not includes the color, then push it into the array.
      if (variantSizeData && !variantSizeData.includes(variant.color)) {
        variantSizeData.push(variant.color)
      } else if (!variantSizeData) {
        // if this size data is undefined, then initialize its object({size: color[]}).
        // e.g. {"XS": [white], "M":[black], "L": [blue]}
        variantsAvailableOptions[variant.size] = [variant.color]
      }
    }
    variants.push(completeDetails)
  })

  return {
    initialVariant,
    variants,
    variantsAvailableOptions,
  }
}

export const parsePrice = (price: string) => {
  return parseFloat(price.replace("$", ""))
}
export const getDiscountedPrice = (price: string, discount: string) => {
  const currentPrice = parsePrice(price)
  let discountedPrice: number

  if (discount.includes("$")) {
    discountedPrice = currentPrice - parsePrice(discount)
  } else {
    discountedPrice = currentPrice - currentPrice * (parseFloat(discount) / 100)
  }
  return discountedPrice
}

// todo: check with jest coding work.
export const getSubtotalPrice = (product: ProductPurchase) => {
  const { discount, price, quantity } = product
  const currentPrice = discount
    ? getDiscountedPrice(price, discount)
    : parsePrice(price)

  return currentPrice * quantity
}

export const getBackgroundColorStyleForButton = (
  color: string
): React.CSSProperties => {
  const arrayColors = color.split("&")
  return arrayColors.length > 1
    ? {
        backgroundImage: `linear-gradient(${arrayColors.join(",")})`,
      }
    : { backgroundColor: color }
}
