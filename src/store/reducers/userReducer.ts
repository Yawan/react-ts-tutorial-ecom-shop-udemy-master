import { Reducer } from "redux"
import { UserActionType } from "../action-types"
import { UserAction } from "../actions/UserAction"
import { ProductFilters } from "./shopReducer"

export interface User {
  filters: ProductFilters
  shopProductsPage: number
  shopProductsSize: number
}

const userInitialState: User = {
  filters: {
    gender: [],
    category: [],
    trends: [],
  },
  shopProductsPage: 1,
  shopProductsSize: 2,
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
    default:
      return state
  }
}
