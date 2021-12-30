import { GetProductOptions } from "../../api/ProductDetailsAPI"
import { ProductDetailActionType } from "../action-types"
import { ProductDetails } from "../reducers/productDetailsReducer"

export interface SetAction {
  type: ProductDetailActionType.SET
  productDetails: ProductDetails
}
export interface FetchAction {
  type: ProductDetailActionType.FETCH
  options: GetProductOptions
}

export type ProductDetailsAction = SetAction | FetchAction
