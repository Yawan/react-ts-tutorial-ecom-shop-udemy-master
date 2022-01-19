import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../../components/ProductCard"
import { ShopActionType } from "../../store/action-types"
import { RootState } from "../../store/reducers"
import "./style.scss"
interface IBestSellerProps {}

const BestSeller: React.FunctionComponent<IBestSellerProps> = (props) => {
  const { bestSellerProducts } = useSelector((state: RootState) => state.shop)

  const dispatch = useDispatch()
  const fetchAllBestSellerProducts = useCallback(() => {
    dispatch({ type: ShopActionType.FETCH_ALL_BEST_SELLER_PRODUCTS })
    // console.log("useCallback fetchAllBestSellerProducts")
  }, [dispatch])

  React.useEffect(() => {
    if (!bestSellerProducts.length) {
      fetchAllBestSellerProducts()
      // console.log("useEffect fetchAllBestSellerProducts")
    }
  }, [fetchAllBestSellerProducts, bestSellerProducts])

  return (
    <div className="best-seller-container">
      <h2>Best Seller</h2>
      <div className="best-seller-products">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
