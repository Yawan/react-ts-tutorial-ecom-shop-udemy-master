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
  totalPages: number
}

export interface ProductFilters {
  gender: string[]
  category: string[]
  trends: string[]
}

export interface ProductFiltersAPIResponse {
  productFilters: ProductFilters
}
export interface Shop {
  shopProducts: ShopProducts
  bestSellerProducts: Product[]
  productFilters: ProductFilters
}

const initialState: Shop = {
  shopProducts: {
    products: [],
    productsCount: 0,
    totalPages: 1,
  },
  productFilters: {
    gender: [],
    category: [],
    trends: [],
  },
  bestSellerProducts: [],
}

export const shopReducer: Reducer<Shop, ShopAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ShopActionType.SET_SHOP_PRODUCTS_AND_FILTERS:
      const { productFilters, shopProducts } = action
      return { ...state, productFilters, shopProducts }
    case ShopActionType.SET_SHOP_PRODUCTS:
      // const { shopProducts } = action // compile error
      const _shopProducts = action.shopProducts
      return { ...state, shopProducts: _shopProducts }
    case ShopActionType.SET_ALL_BEST_SELLER_PRODUCTS:
      const { bestSellerProducts } = action
      return { ...state, bestSellerProducts }
    default:
      return state
  }
}
