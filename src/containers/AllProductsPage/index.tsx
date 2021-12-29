import * as React from "react"
import { useSelector } from "react-redux"

// import * as actionCreators from "../../store/action-creators"
// import { bindActionCreators } from "redux"
import ProductCard from "../../components/ProductCard"
import { RootState } from "../../store/reducers"
import "./style.scss"

interface IAllProductsPageProps {}

const AllProductsPage: React.FunctionComponent<IAllProductsPageProps> = (
  props
) => {
  const productDetails = useSelector((state: RootState) => state.productDetails)
  // const dispatch = useDispatch()
  // const { fetchProductDetails } = bindActionCreators(actionCreators, dispatch)

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
