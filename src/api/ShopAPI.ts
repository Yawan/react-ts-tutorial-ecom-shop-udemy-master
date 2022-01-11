import axios from "axios"

export interface GetProductOptions {
  page?: number
  size?: number
  category?: string[]
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
      `${this.baseUrl}/products?${pageQueryParam}${sizeQueryParam}${categoryQueryParam}`
    )
  }
  getProductFilter = () => {
    return axios.get(`${this.baseUrl}/productFilters`)
  }
}

export default ShopAPI
