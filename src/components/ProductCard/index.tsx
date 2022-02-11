import React, { useState } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { Product } from "../../store/reducers/shopReducer"
import { getProductVariantDetails } from "../../utils/product"
import ProductCardModal from "../ProductCardModal"
import "./style.scss"

interface IProductCardProps {
  product: Product
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({
  product,
}) => {
  const [showDetail, setShowDetail] = useState(false)
  const { initialVariant, variants, variantsAvailableOptions } =
    getProductVariantDetails(product)
  const url = variants[0].image
  const onClickProductCard = () => {
    setShowDetail(true)
  }
  const onClickOutsideModal = () => {
    setShowDetail(false)
  }
  return (
    <ThemeContext.Consumer>
      {(theme) =>
        initialVariant ? (
          <div
            onClick={onClickProductCard}
            className={`product-card-container ${theme}`}
          >
            <div
              style={{ backgroundImage: `url(${url})` }}
              className="product-img"
            ></div>
            <div className="product-details">
              <p>{initialVariant.title}</p>
            </div>
            <ProductCardModal
              show={showDetail}
              initialVariant={initialVariant}
              variants={variants}
              variantsAvailableOptions={variantsAvailableOptions}
              onClickOutsideModal={onClickOutsideModal}
            />
          </div>
        ) : null
      }
    </ThemeContext.Consumer>
  )
}

export default ProductCard
