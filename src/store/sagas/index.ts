import { all } from "redux-saga/effects"
import { watchShopSaga } from "./shopSaga"

export default function* rootSaga() {
  yield all([watchShopSaga()])
}
