import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../../components/ProductCard"
import { ProductDetailActionType } from "../../store/action-types"
import { RootState } from "../../store/reducers"
import "./style.scss"

interface IAllProductsPageProps {}

const AllProductsPage: React.FunctionComponent<IAllProductsPageProps> = (
  props
) => {
  const { shopProducts } = useSelector(
    (state: RootState) => state.productDetails
  )

  const dispatch = useDispatch()

  const fetchAllProducts = useCallback(() => {
    dispatch({
      type: ProductDetailActionType.FETCH_SHOP_PRODUCTS,
      options: {},
    })
    // console.log("useCallback fetchAllProducts")
  }, [dispatch])

  useEffect(() => {
    if (!shopProducts.products.length) {
      fetchAllProducts()
      // console.log("useEffect fetchAllProducts()")
    }
  }, [fetchAllProducts, shopProducts.products])

  const renderAllProducts = () => {
    return shopProducts.products.map(({ id, title, variants }) => {
      return (
        <div className="product-item-container" key={id}>
          <ProductCard name={title} url={variants[0].image} />
        </div>
      )
    })
  }
  return (
    <div className="all-products-page-container">{renderAllProducts()}</div>
  )
}

export default AllProductsPage
