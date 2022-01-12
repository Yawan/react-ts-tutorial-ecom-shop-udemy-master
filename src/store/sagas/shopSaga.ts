import { call, put, takeLatest } from "redux-saga/effects"
import ShopAPI from "../../api/ShopAPI"
import { ShopActionType } from "../action-types"
import { FetchShopProductsAction, ShopAction } from "../actions/ShopAction"
import {
  ProductFiltersAPIResponse,
  ShopProducts,
} from "../reducers/shopReducer"

function* workerFetchShopProductsSage(action: FetchShopProductsAction): any {
  const shopAPI = new ShopAPI()

  try {
    const response = yield call(shopAPI.getProduct, action.options)
    const shopProducts = response.data as ShopProducts

    // console.log("saga", shopProducts)
    yield put<ShopAction>({
      type: ShopActionType.SET_SHOP_PRODUCTS,
      shopProducts,
    })
  } catch (error) {
    console.log(error)
  }
}

function* workerFetchBestSellerSage(): any {
  const shopAPI = new ShopAPI()

  try {
    const response = yield call(shopAPI.getProduct, {
      category: ["best seller"],
    })
    const { products } = response.data as ShopProducts

    yield put<ShopAction>({
      type: ShopActionType.SET_ALL_BEST_SELLER_PRODUCTS,
      bestSellerProducts: products,
    })
  } catch (error) {
    console.log(error)
  }
}

function* workerFetchShopProductsAndFilterSage(
  action: FetchShopProductsAction
): any {
  const shopAPI = new ShopAPI()

  try {
    const productResponse = yield call(shopAPI.getProduct, {})
    const productFilterResponse = yield call(shopAPI.getProductFilter)
    const shopProducts = productResponse.data as ShopProducts
    const { productFilters } =
      productFilterResponse.data as ProductFiltersAPIResponse

    // console.log("saga", shopProducts)
    yield put<ShopAction>({
      type: ShopActionType.SET_SHOP_PRODUCTS_AND_FILTERS,
      shopProducts,
      productFilters,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* watchShopSaga() {
  yield takeLatest(
    ShopActionType.FETCH_SHOP_PRODUCTS,
    workerFetchShopProductsSage
  )
  yield takeLatest(
    ShopActionType.FETCH_ALL_BEST_SELLER_PRODUCTS,
    workerFetchBestSellerSage
  )

  yield takeLatest(
    ShopActionType.FETCH_SHOP_PRODUCTS_AND_FILTERS,
    workerFetchShopProductsAndFilterSage
  )
}
