import React, { Dispatch, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AllProductsSideBar from "../../components/AllProductsSideBar"
import Pagination from "../../components/Pagination"
import ProductCard from "../../components/ProductCard"
import { ShopActionType, UserActionType } from "../../store/action-types"
import { ShopAction } from "../../store/actions/ShopAction"
import { UserAction } from "../../store/actions/UserAction"
import { RootState } from "../../store/reducers"
import "./style.scss"

interface IAllProductsPageProps {}

const AllProductsPage: React.FunctionComponent<IAllProductsPageProps> = (
  props
) => {
  const { shop, user } = useSelector((state: RootState) => state)
  const { shopProducts, productFilters } = shop
  const { shopProductsPage, filters: userFilters } = user
  const dispatch: Dispatch<ShopAction | UserAction> = useDispatch()

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

  const renderAllProducts = () => {
    return shopProducts.products.map((product) => {
      return (
        <div className="product-item-container" key={product.id}>
          <ProductCard product={product} />
        </div>
      )
    })
  }

  const updateUserShopProductsPage = (shopProductsPage: number) => {
    dispatch({
      type: UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE,
      shopProductsPage,
    })
  }

  const handlePageChange = (selectedPage: number) => {
    if (shopProductsPage !== selectedPage) {
      updateUserShopProductsPage(selectedPage)
    }
  }

  return (
    <div className="all-products-page-container">
      <AllProductsSideBar
        productFilters={productFilters}
        userFilters={userFilters}
      ></AllProductsSideBar>
      <div className="all-products-container">
        <div className="all-products">{renderAllProducts()}</div>
        <Pagination
          numberOfPages={shopProducts.totalPages}
          onChange={handlePageChange}
          overrideSelectedPage={shopProductsPage}
        />
      </div>
    </div>
  )
}

export default AllProductsPage
