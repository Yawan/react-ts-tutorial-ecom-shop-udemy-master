import { call, put, select, takeLatest } from "redux-saga/effects"
import ShopAPI, { GetProductOptions } from "../../api/ShopAPI"
import { ShopActionType } from "../action-types"
import { FetchShopProductsAction, ShopAction } from "../actions/ShopAction"
import { RootState } from "../reducers"
import {
  ProductFiltersAPIResponse,
  ShopProducts,
} from "../reducers/shopReducer"
import { User } from "../reducers/userReducer"

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

// function* workerFetchShopProductsAndFilterSage(
//   action: FetchShopProductsAction
function* workerFetchShopProductsAndFilterSage(): any {
  const shopAPI = new ShopAPI()

  const user: User = yield select((state: RootState) => state.user)
  const options: GetProductOptions = {
    page: user.shopProductsPage,
    size: user.shopProductsSize,
  }

  try {
    const productResponse = yield call(shopAPI.getProduct, options)
    const productFilterResponse = yield call(shopAPI.getProductFilter)
    const shopProducts = productResponse.data as ShopProducts
    const { productFilters } =
      productFilterResponse.data as ProductFiltersAPIResponse

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
