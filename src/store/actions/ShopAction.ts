import { GetProductOptions } from "../../api/ShopAPI"
import { ShopActionType } from "../action-types"
import { Product, ProductFilters, ShopProducts } from "../reducers/shopReducer"

export interface FetchShopProductsAction {
  type: ShopActionType.FETCH_SHOP_PRODUCTS
  options: GetProductOptions
}
export interface SetShopProductsAction {
  type: ShopActionType.SET_SHOP_PRODUCTS
  shopProducts: ShopProducts
}

export interface FetchBestSellerProductsAction {
  type: ShopActionType.FETCH_ALL_BEST_SELLER_PRODUCTS
}
export interface SetBestSellerProductsAction {
  type: ShopActionType.SET_ALL_BEST_SELLER_PRODUCTS
  bestSellerProducts: Product[]
}

export interface FetchShopProductsAndFiltersAction {
  type: ShopActionType.FETCH_SHOP_PRODUCTS_AND_FILTERS
}
export interface SetShopProductsAndFiltersAction {
  type: ShopActionType.SET_SHOP_PRODUCTS_AND_FILTERS
  shopProducts: ShopProducts
  productFilters: ProductFilters
}

export type ShopAction =
  | FetchShopProductsAction
  | SetShopProductsAction
  | FetchBestSellerProductsAction
  | SetBestSellerProductsAction
  | FetchShopProductsAndFiltersAction
  | SetShopProductsAndFiltersAction
