import * as React from "react"
import "./style.scss"

interface IProductCardProps {
  url: string
  name: string
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({
  url,
  name,
}) => {
  return (
    <div className="product-card-container">
      <div
        style={{ backgroundImage: `url(${url})` }}
        className="product-img"
      ></div>
      <div className="product-details">
        <p>{name}</p>
      </div>
    </div>
  )
}

export default ProductCard
