import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import ProductCard from "../../components/ProductCard"
import { actionCreators } from "../../store"
import { ProductDetailActionType } from "../../store/action-types"
import { RootState } from "../../store/reducers"
import "./style.scss"

interface IAllProductsPageProps {}

const AllProductsPage: React.FunctionComponent<IAllProductsPageProps> = (
  props
) => {
  const productDetails = useSelector((state: RootState) => state.productDetails)

  const dispatch = useDispatch()

  // todo: check how to make this work.
  const { setProductDetails } = bindActionCreators(actionCreators, dispatch)

  React.useEffect(() => {
    const fetchProductDetails = () => {
      dispatch({
        type: ProductDetailActionType.FETCH,
        options: {},
      })
    }
    fetchProductDetails()
  }, [dispatch])

  const renderAllProducts = () => {
    return productDetails.products.map(({ id, title, variants }) => {
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
