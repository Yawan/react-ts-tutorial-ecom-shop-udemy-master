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
  const { shopProducts, productFilters } = useSelector(
    (state: RootState) => state.shop
  )
  const { shopProductsPage } = useSelector((state: RootState) => state.user)

  const dispatch: Dispatch<ShopAction | UserAction> = useDispatch()

  const fetchAllProducts = useCallback(() => {
    dispatch({
      type: ShopActionType.FETCH_SHOP_PRODUCTS_AND_FILTERS,
    })
  }, [dispatch])

  const updateUserShopProductsPage = useCallback(
    (shopProductsPage: number) => {
      dispatch({
        type: UserActionType.UPDATE_USER_SHOP_PRODUCTS_PAGE,
        shopProductsPage,
      })
    },
    [dispatch]
  )

  useEffect(() => {
    if (!shopProducts.products.length) {
      fetchAllProducts()
    }
  }, [fetchAllProducts, shopProducts.products])

  const handlePageChange = (selectedPage: number) => {
    if (shopProductsPage !== selectedPage) {
      updateUserShopProductsPage(selectedPage)
    }
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

  return (
    <div className="all-products-page-container">
      <AllProductsSideBar productFilters={productFilters}></AllProductsSideBar>
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
