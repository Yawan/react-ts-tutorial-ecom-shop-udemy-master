import axios from "axios"

class ProductDetailsAPI {
  getProduct = (page?: number, size?: number) => {
    return axios.get(
      `http://localhost:1234/products?page=${page || ""}&size=${size || ""}`
    )
  }
}

export default ProductDetailsAPI
