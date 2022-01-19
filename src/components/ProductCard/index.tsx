import React, { useState } from "react"
import { Product } from "../../store/reducers/shopReducer"
import ProductCardModal from "../ProductCardModal"
import "./style.scss"

interface IProductCardProps {
  product: Product
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({
  product,
}) => {
  const [showDetail, setShowDetail] = useState(false)
  const { title, variants } = product
  const url = variants[0].image
  const onClickProductCard = () => {
    setShowDetail(true)
  }
  const onClickOutsideModal = () => {
    setShowDetail(false)
  }
  return (
    <div onClick={onClickProductCard} className="product-card-container">
      <div
        style={{ backgroundImage: `url(${url})` }}
        className="product-img"
      ></div>
      <div className="product-details">
        <p>{title}</p>
      </div>
      <ProductCardModal
        show={showDetail}
        product={product}
        onClickOutsideModal={onClickOutsideModal}
      />
    </div>
  )
}

export default ProductCard
