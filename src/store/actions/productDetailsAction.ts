import { ProductDetailActionType } from "../action-types"
import { ProductDetails } from "../reducers/productDetailsReducer"

interface SetAction {
  type: ProductDetailActionType.SET
  productDetails: ProductDetails
}
interface FetchAction {
  type: ProductDetailActionType.FETCH
}

export type ProductDetailsAction = SetAction | FetchAction
