import { Reducer } from "redux"
import { UserActionType } from "../action-types"
import { UserAction } from "../actions/UserAction"

export interface User {
  shopProductsPage: number
  shopProductsSize: number
}

const userInitialState: User = {
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
    default:
      return state
  }
}
