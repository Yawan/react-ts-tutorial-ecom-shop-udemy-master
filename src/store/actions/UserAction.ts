import { UserActionType } from "../action-types"
import { ProductFilters } from "../reducers/shopReducer"
import { ProductPurchase } from "../reducers/userReducer"

export interface UpdateUserShopProductsPageAction {
  type: UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE
  shopProductsPage: number
}
export interface UpdateUserFiltersAction {
  type: UserActionType.UPDATE_USER_FILTERS
  filters: ProductFilters
}
export interface AddToCartAction {
  type: UserActionType.ADD_TO_CART
  productPurchase: ProductPurchase
}
export interface RemoveFromCartAction {
  type: UserActionType.REMOVE_FROM_CART
  productPurchase: ProductPurchase
}

export type UserAction =
  | UpdateUserShopProductsPageAction
  | UpdateUserFiltersAction
  | AddToCartAction
  | RemoveFromCartAction
