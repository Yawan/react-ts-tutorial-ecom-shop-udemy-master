import { all } from "redux-saga/effects"
import { watchProductDetailsSaga } from "./productDetailsSaga"

export default function* rootSaga() {
  yield all([watchProductDetailsSaga()])
}
