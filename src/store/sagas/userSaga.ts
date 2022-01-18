import { call, put, select, takeLatest } from "redux-saga/effects"
import ShopAPI, { GetProductOptions } from "../../api/ShopAPI"
import { ShopActionType, UserActionType } from "../action-types"
import { ShopAction } from "../actions/ShopAction"
import { UpdateUserShopProductsAction } from "../actions/UserAction"
import { RootState } from "../reducers"
import { ShopProducts } from "../reducers/shopReducer"
import { User } from "../reducers/userReducer"

function* workerUpdateUserShopProductsPageSage(
  action: UpdateUserShopProductsAction
): any {
  const shopAPI = new ShopAPI()

  try {
    const user: User = yield select((state: RootState) => state.user)
    const options: GetProductOptions = {
      page: action.shopProductsPage,
      size: user.shopProductsSize,
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

export function* watchUserSaga() {
  yield takeLatest(
    UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE,
    workerUpdateUserShopProductsPageSage
  )
}
