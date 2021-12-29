import { combineReducers } from "redux"
import { productDetailsReducer } from "./productDetailsReducer"

export const rootReducer = combineReducers({
  productDetails: productDetailsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
