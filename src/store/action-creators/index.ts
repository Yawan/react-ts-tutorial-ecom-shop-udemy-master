import { Dispatch } from "react"
import { ProductDetailActionType } from "../action-types"
import { ProductDetailsAction } from "../actions/productDetailsAction"
import { ProductDetails } from "../reducers/productDetailsReducer"

export const fetchProductDetails = () => {
  return (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({
      type: ProductDetailActionType.FETCH,
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
