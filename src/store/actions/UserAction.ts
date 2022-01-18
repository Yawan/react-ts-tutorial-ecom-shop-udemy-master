import { UserActionType } from "../action-types"
import { ProductFilters } from "../reducers/shopReducer"

export interface UpdateUserShopProductsPageAction {
  type: UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE
  shopProductsPage: number
}
export interface UpdateUserFiltersAction {
  type: UserActionType.UPDATE_USER_FILTERS
  filters: ProductFilters
}

export type UserAction =
  | UpdateUserShopProductsPageAction
  | UpdateUserFiltersAction
