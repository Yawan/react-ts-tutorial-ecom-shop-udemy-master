import { call, put, takeLatest } from "redux-saga/effects"
import ProductDetailsAPI from "../../api/ProductDetailsAPI"
import { ProductDetailActionType } from "../action-types"
import { FetchAction } from "../actions/productDetailsAction"
import { ProductDetails } from "../reducers/productDetailsReducer"

function* workerFetchProductDetailSage(action: FetchAction): any {
  const productDetailsAPI = new ProductDetailsAPI()

  try {
    const response = yield call(productDetailsAPI.getProduct, action.options)
    const productDetails = response.data as ProductDetails

    yield put({
      type: ProductDetailActionType.SET,
      productDetails,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* watchProductDetailsSaga() {
  yield takeLatest(ProductDetailActionType.FETCH, workerFetchProductDetailSage)
}
