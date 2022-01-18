import { UserActionType } from "../action-types"

export interface UpdateUserShopProductsAction {
  type: UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE
  shopProductsPage: number
}

export type UserAction = UpdateUserShopProductsAction
