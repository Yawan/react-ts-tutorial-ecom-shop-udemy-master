import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AllProductsSideBar from "../../components/AllProductsSideBar"
import ProductCard from "../../components/ProductCard"
import { ShopActionType } from "../../store/action-types"
import { RootState } from "../../store/reducers"
import { Product, ProductFilters } from "../../store/reducers/shopReducer"
import "./style.scss"

interface IAllProductsPageProps {}

const AllProductsPage: React.FunctionComponent<IAllProductsPageProps> = (
  props
) => {
  const { shopProducts, productFilters } = useSelector(
    (state: RootState) => state.shop
  )
  const initialFilter: ProductFilters = { gender: [], category: [], trends: [] }
  const [userFilters, setUserFilters] = useState(initialFilter)

  const dispatch = useDispatch()

  const fetchAllProducts = useCallback(() => {
    dispatch({
      type: ShopActionType.FETCH_SHOP_PRODUCTS_AND_FILTERS,
    })
  }, [dispatch])

  useEffect(() => {
    if (!shopProducts.products.length) {
      fetchAllProducts()
    }
  }, [fetchAllProducts, shopProducts.products])

  // useEffect(() => {
  //   // alert(userFilters)
  //   console.log("eff", !userFilters.category.length)
  //   console.log("eff", !userFilters.gender)
  //   console.log("eff", !userFilters.trends)
  // }, [userFilters])

  const isFilterEnabled = () => {
    if (
      !userFilters.category.length &&
      !userFilters.gender.length &&
      !userFilters.trends.length
    ) {
      return false
    }
    return true
  }

  const isIncludedInUserFilters = (product: Product) => {
    const productFilters = product.category
    return productFilters.some(
      (filter) =>
        userFilters.category.includes(filter) ||
        userFilters.gender.includes(filter) ||
        userFilters.trends.includes(filter)
    )
  }

  const renderAllProducts = () => {
    return shopProducts.products.map(({ id, title, variants }) => {
      return (
        <div className="product-item-container" key={id}>
          <ProductCard name={title} url={variants[0].image} />
        </div>
      )
    })
  }

  const renderFilteredProducts = () => {
    return shopProducts.products
      .filter((product) => isIncludedInUserFilters(product))
      .map(({ id, title, variants }) => {
        return (
          <div className="product-item-container" key={id}>
            <ProductCard name={title} url={variants[0].image} />
          </div>
        )
      })
  }

  return (
    <div className="all-products-page-container">
      <AllProductsSideBar
        productFilters={productFilters}
        userFilters={userFilters}
        setUserFilter={setUserFilters}
      ></AllProductsSideBar>
      <div className="all-products-container">
        {isFilterEnabled() ? renderFilteredProducts() : renderAllProducts()}
      </div>
    </div>
  )
}

export default AllProductsPage
