import { Reducer } from "redux"
import { UserActionType } from "../action-types"
import { UserAction } from "../actions/UserAction"
import { ProductFilters, ProductVariantsCompleteDetails } from "./shopReducer"

export interface ProductPurchase extends ProductVariantsCompleteDetails {
  quantity: number
}

export interface User {
  filters: ProductFilters
  shopProductsPage: number
  shopProductsSize: number
  cart: ProductPurchase[]
}

const userInitialState: User = {
  filters: {
    gender: [],
    category: [],
    trends: [],
  },
  shopProductsPage: 1,
  shopProductsSize: 2,
  cart: [],
}

export const userReducer: Reducer<User, UserAction> = (
  state = userInitialState,
  action
) => {
  switch (action.type) {
    case UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE:
      return { ...state, shopProductsPage: action.shopProductsPage }
    case UserActionType.UPDATE_USER_FILTERS:
      return { ...state, filters: action.filters }
    case UserActionType.ADD_TO_CART:
      let cart = [...state.cart, action.productPurchase]
      return { ...state, cart }
    case UserActionType.REMOVE_FROM_CART:
      const { productId, variantId } = action.productPurchase
      const newCart = state.cart.filter((x) => {
        return x.productId !== productId || x.variantId !== variantId
      })

      return { ...state, cart: newCart }
    default:
      return state
  }
}
