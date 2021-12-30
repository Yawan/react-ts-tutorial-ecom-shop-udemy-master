import { Dispatch } from "react"
import { GetProductOptions } from "../../api/ProductDetailsAPI"
import { ProductDetailActionType } from "../action-types"
import { ProductDetailsAction } from "../actions/productDetailsAction"
import { ProductDetails } from "../reducers/productDetailsReducer"

export const fetchProductDetails = (options: GetProductOptions) => {
  return (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({
      type: ProductDetailActionType.FETCH,
      options,
    })
  }
}

export const setProductDetails = (productDetails: ProductDetails) => {
  return (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({
      type: ProductDetailActionType.SET,
      productDetails,
    })
  }
}
