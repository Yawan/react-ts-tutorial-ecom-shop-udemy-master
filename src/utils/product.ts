import { ProductVariantsCompleteDetails } from "../store/reducers/shopReducer"
import { Product } from "./../store/reducers/shopReducer"
import { omit } from "./helper"

export type initialVariant = ProductVariantsCompleteDetails | null
export interface GetProductVariantDetails {
  initialVariant: initialVariant
  variants: ProductVariantsCompleteDetails[]
}

export const getProductVariantDetails = (
  product: Product
): GetProductVariantDetails => {
  let initialVariant: initialVariant = null
  let foundInitialVariant: boolean = false
  const variants: ProductVariantsCompleteDetails[] = []

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

    variants.push(completeDetails)
  })

  return {
    initialVariant,
    variants,
  }
}

export const getDiscountedPrice = (price: string, discount: string) => {
  const currentPrice = parseFloat(price.replace("$", ""))
  let discountedPrice: number

  if (discount.includes("$")) {
    discountedPrice = currentPrice - parseFloat(discount.replace("$", ""))
  } else {
    discountedPrice = currentPrice - currentPrice * (parseFloat(discount) / 100)
  }
  return discountedPrice
}
