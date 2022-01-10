import { Dispatch } from "react"
import { GetProductOptions } from "../../api/ProductDetailsAPI"
import { ProductDetailActionType } from "../action-types"
import { ProductDetailsAction } from "../actions/productDetailsAction"
import { Product, ShopProducts } from "../reducers/productDetailsReducer"

export const fetchProductDetails = (options: GetProductOptions) => {
  return (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({
      type: ProductDetailActionType.FETCH_SHOP_PRODUCTS,
      options,
    })
  }
}

export const setProductDetails = (shopProducts: ShopProducts) => {
  return (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({
      type: ProductDetailActionType.SET_SHOP_PRODUCTS,
      shopProducts,
    })
  }
}

export const fetchAllBestSellerProducts = () => {
  return (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({
      type: ProductDetailActionType.FETCH_ALL_BEST_SELLER_PRODUCTS,
    })
  }
}
export const setAllBestSellerProducts = (bestSellerProducts: Product[]) => {
  return (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({
      type: ProductDetailActionType.SET_ALL_BEST_SELLER_PRODUCTS,
      bestSellerProducts,
    })
  }
}
