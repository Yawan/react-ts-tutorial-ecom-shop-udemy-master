import { call, put, select, takeLatest } from "redux-saga/effects"
import ShopAPI, { GetProductOptions } from "../../api/ShopAPI"
import { convertFiltersToCategories } from "../../utils/helper"
import { ShopActionType, UserActionType } from "../action-types"
import { ShopAction } from "../actions/ShopAction"
import {
  UpdateUserFiltersAction,
  UpdateUserShopProductsPageAction,
  UserAction,
} from "../actions/UserAction"
import { RootState } from "../reducers"
import { ShopProducts } from "../reducers/shopReducer"
import { User } from "../reducers/userReducer"

function* workerUpdateUserShopProductsPageSage(
  action: UpdateUserShopProductsPageAction
): any {
  const shopAPI = new ShopAPI()

  try {
    const user: User = yield select((state: RootState) => state.user)
    const options: GetProductOptions = {
      page: action.shopProductsPage,
      size: user.shopProductsSize,
      category: convertFiltersToCategories(user.filters),
    }

    const response = yield call(shopAPI.getProduct, options)
    const shopProducts = response.data as ShopProducts

    yield put<ShopAction>({
      type: ShopActionType.SET_SHOP_PRODUCTS,
      shopProducts,
    })
  } catch (error) {
    console.log(error)
  }
}
function* workerUpdateUserFiltersPageSage(
  action: UpdateUserFiltersAction
): any {
  const shopAPI = new ShopAPI()

  try {
    const user: User = yield select((state: RootState) => state.user)
    const newUserPage = 1
    const options: GetProductOptions = {
      page: newUserPage,
      size: user.shopProductsSize,
      category: convertFiltersToCategories(action.filters),
    }

    const response = yield call(shopAPI.getProduct, options)
    const shopProducts = response.data as ShopProducts

    yield put<ShopAction>({
      type: ShopActionType.SET_SHOP_PRODUCTS,
      shopProducts,
    })
    // update paginatin components to page 1
    yield put<UserAction>({
      type: UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE,
      shopProductsPage: newUserPage,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* watchUserSaga() {
  yield takeLatest(
    UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE,
    workerUpdateUserShopProductsPageSage
  )
  yield takeLatest(
    UserActionType.UPDATE_USER_FILTERS,
    workerUpdateUserFiltersPageSage
  )
}
