import React from "react"

interface IQuantityProps {
  quantity: number
  onClickMinus(): void
  onClickPlus(): void
}

const Quantity: React.FunctionComponent<IQuantityProps> = ({
  quantity,
  onClickMinus,
  onClickPlus,
}) => {
  return (
    <div className="quantity-container">
      <label>
        <i className="fa fa-minus qty-button" onClick={onClickMinus}></i>
        <span className="qty-value">QTY {quantity}</span>
        <i className="fa fa-plus qty-button" onClick={onClickPlus}></i>
      </label>
    </div>
  )
}

export default Quantity
