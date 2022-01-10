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
  variants: ProductVariants[]
}
export interface ShopProducts {
  products: Product[]
  page?: number
  nextPage?: boolean
  productsCount: number
  totalPages?: number
}

export interface ProductDetails {
  shopProducts: ShopProducts
  bestSellerProducts: Product[]
}

const initialState: ProductDetails = {
  shopProducts: {
    products: [],
    productsCount: 0,
  },
  bestSellerProducts: [],
}

export const productDetailsReducer: Reducer<
  ProductDetails,
  ProductDetailsAction
> = (state = initialState, action) => {
  switch (action.type) {
    case ProductDetailActionType.SET_SHOP_PRODUCTS:
      const { shopProducts } = action
      return { ...state, shopProducts }
    case ProductDetailActionType.SET_ALL_BEST_SELLER_PRODUCTS:
      const { bestSellerProducts } = action
      return { ...state, bestSellerProducts }
    default:
      return state
  }
}
