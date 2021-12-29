import { Reducer } from "redux"
import { ProductDetailActionType } from "../action-types"
import { ProductDetailsAction } from "../actions/productDetailsAction"

export interface ProductVariants {
  id: string
  size: string
  color: string
  price: string
  stock: number
  discount: string
  image: string
}

export interface Product {
  id: string
  category: string[]
  title: string
  isBestSeller?: boolean
  variants: ProductVariants[]
}
export interface ProductDetails {
  products: Product[]
  page?: number
  nextPage?: boolean
  productsCount: number
}

const initialState = {
  products: [],
  productsCount: 0,
}

export const productDetailsReducer: Reducer<
  ProductDetails,
  ProductDetailsAction
> = (state = initialState, action) => {
  switch (action.type) {
    case ProductDetailActionType.SET:
      return action.productDetails
    default:
      return state
  }
}
