import { call, put, takeLatest } from "redux-saga/effects"
import ProductDetailsAPI from "../../api/ProductDetailsAPI"
import { ProductDetailActionType } from "../action-types"
import {
  FetchShopProductsAction,
  ProductDetailsAction,
} from "../actions/productDetailsAction"
import { ShopProducts } from "../reducers/productDetailsReducer"

function* workerFetchShopProductSage(action: FetchShopProductsAction): any {
  const productDetailsAPI = new ProductDetailsAPI()

  try {
    const response = yield call(productDetailsAPI.getProduct, action.options)
    const shopProducts = response.data as ShopProducts

    // console.log("saga", shopProducts)
    yield put<ProductDetailsAction>({
      type: ProductDetailActionType.SET_SHOP_PRODUCTS,
      shopProducts,
    })
  } catch (error) {
    console.log(error)
  }
}

function* workerFetchBestSellerSage(): any {
  const productDetailsAPI = new ProductDetailsAPI()

  try {
    const response = yield call(productDetailsAPI.getProduct, {
      category: ["best seller"],
    })
    const { products } = response.data as ShopProducts

    yield put<ProductDetailsAction>({
      type: ProductDetailActionType.SET_ALL_BEST_SELLER_PRODUCTS,
      bestSellerProducts: products,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* watchProductDetailsSaga() {
  yield takeLatest(
    ProductDetailActionType.FETCH_SHOP_PRODUCTS,
    workerFetchShopProductSage
  )
  yield takeLatest(
    ProductDetailActionType.FETCH_ALL_BEST_SELLER_PRODUCTS,
    workerFetchBestSellerSage
  )
}
