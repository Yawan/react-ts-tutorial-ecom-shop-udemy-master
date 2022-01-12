import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AllProductsSideBar from "../../components/AllProductsSideBar"
import ProductCard from "../../components/ProductCard"
import { ShopActionType } from "../../store/action-types"
import { RootState } from "../../store/reducers"
import "./style.scss"

interface IAllProductsPageProps {}

const AllProductsPage: React.FunctionComponent<IAllProductsPageProps> = (
  props
) => {
  const { shopProducts, productFilters } = useSelector(
    (state: RootState) => state.shop
  )

  const dispatch = useDispatch()

  const fetchAllProducts = useCallback(() => {
    // dispatch({
    //   type: ShopActionType.FETCH_SHOP_PRODUCTS,
    //   options: {},
    // })
    dispatch({
      type: ShopActionType.FETCH_SHOP_PRODUCTS_AND_FILTERS,
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
    <div className="all-products-page-container">
      <AllProductsSideBar productFilters={productFilters}></AllProductsSideBar>
      <div className="all-products-container">{renderAllProducts()}</div>
    </div>
  )
}

export default AllProductsPage
