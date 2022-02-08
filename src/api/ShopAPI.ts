import axios from "axios"
import { CustomerInfoFieldList } from "../constants/user"
import { ProductPurchase } from "../store/reducers/userReducer"

export interface GetProductOptions {
  page?: number
  size?: number
  category?: string[]
}

export interface Order {
  cart: ProductPurchase[]
  user: CustomerInfoFieldList
}
class ShopAPI {
  baseUrl = "http://localhost:1234"
  getProduct = (options: GetProductOptions) => {
    const { page, size, category } = options

    const pageQueryParam = `page=${page || ""}`
    const sizeQueryParam = `&size=${size || ""}`
    const categoryQueryParam = `&category=${
      category ? category.join("&category=") : ""
    }`

    return axios.get(
      `${this.baseUrl}/product/all?${pageQueryParam}${sizeQueryParam}${categoryQueryParam}`
    )
  }

  getProductFilter = () => {
    return axios.get(`${this.baseUrl}/product/filters`)
  }

  postOrder = (order: Order) => {
    const body = {
      order,
    }
    return axios.post(`${this.baseUrl}/order`, body)
  }
}

export default ShopAPI
