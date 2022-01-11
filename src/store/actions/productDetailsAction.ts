import { GetProductOptions } from "../../api/ProductDetailsAPI"
import { ProductDetailActionType } from "../action-types"
import { Product, ShopProducts } from "../reducers/productDetailsReducer"

export interface FetchShopProductsAction {
  type: ProductDetailActionType.FETCH_SHOP_PRODUCTS
  options: GetProductOptions
}
export interface SetShopProductsAction {
  type: ProductDetailActionType.SET_SHOP_PRODUCTS
  shopProducts: ShopProducts
}

export interface FetchBestSellerProductsAction {
  type: ProductDetailActionType.FETCH_ALL_BEST_SELLER_PRODUCTS
}
export interface SetBestSellerProductsAction {
  type: ProductDetailActionType.SET_ALL_BEST_SELLER_PRODUCTS
  bestSellerProducts: Product[]
}

export type ProductDetailsAction =
  | FetchShopProductsAction
  | SetShopProductsAction
  | FetchBestSellerProductsAction
  | SetBestSellerProductsAction
