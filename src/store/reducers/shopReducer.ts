import { Reducer } from "redux"
import { ShopActionType } from "../action-types"
import { ShopAction } from "../actions/ShopAction"

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

export interface Shop {
  shopProducts: ShopProducts
  bestSellerProducts: Product[]
}

const initialState: Shop = {
  shopProducts: {
    products: [],
    productsCount: 0,
  },
  bestSellerProducts: [],
}

export const shopReducer: Reducer<Shop, ShopAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ShopActionType.SET_SHOP_PRODUCTS:
      const { shopProducts } = action
      return { ...state, shopProducts }
    case ShopActionType.SET_ALL_BEST_SELLER_PRODUCTS:
      const { bestSellerProducts } = action
      return { ...state, bestSellerProducts }
    default:
      return state
  }
}
