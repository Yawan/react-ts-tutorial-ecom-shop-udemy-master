import * as React from "react"
import { ProductVariantsCompleteDetails } from "../../store/reducers/shopReducer"
import { getDiscountedPrice } from "../../utils/product"
import Button from "../ui/Button"
import Modal from "../ui/Modal"
import "./style.scss"

export interface IProductCardModalProps {
  show: boolean
  // product: Product
  initialVariant: ProductVariantsCompleteDetails
  variants: ProductVariantsCompleteDetails[]
  onClickOutsideModal(): void
}

export interface IProductCardModalState {
  selectedVariant: ProductVariantsCompleteDetails
  quantity: number
}

export default class ProductCardModal extends React.Component<
  IProductCardModalProps,
  IProductCardModalState
> {
  /**
   *
   */
  constructor(props: IProductCardModalProps) {
    super(props)

    this.state = { selectedVariant: props.initialVariant, quantity: 1 }
  }
  public render() {
    const { show, onClickOutsideModal } = this.props
    const { selectedVariant } = this.state
    const { image, title } = selectedVariant

    return (
      <Modal
        modalBodyClassName="product-card-modal-body"
        show={show}
        onClickOutsideModal={onClickOutsideModal}
      >
        <div className="modal-product-details-container">
          <div className="modal-product-image-container">
            <div
              className="modal-product-image"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
          <div className="modal-product-details">
            <p className="modal-product-name">{title}</p>
            {this.renderPriceUI()}
            {this.renderQuantityUI()}
            {this.renderVariantOptions()}
            <Button
              className="add-to-cart-button"
              type="primary"
              onClick={() => {}}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Modal>
    )
  }
  renderPriceUI = () => {
    const { selectedVariant } = this.state
    const { discount, price } = selectedVariant

    const priceUI = (
      <p className="price-ui">
        {discount ? (
          <React.Fragment>
            <del>{price}</del>
            <ins>{getDiscountedPrice(price, discount)}</ins>
          </React.Fragment>
        ) : (
          <ins>{price}</ins>
        )}
      </p>
    )

    return priceUI
  }

  renderQuantityUI = () => {
    const { quantity } = this.state
    return (
      <div className="quantity-container">
        <label>
          <i className="fa fa-minus qty-button"></i>
          <span className="qty-value">QTY {quantity}</span>
          <i className="fa fa-plus qty-button"></i>
        </label>
      </div>
    )
  }

  renderVariantOptionsContainer = (
    category: string,
    options: React.ReactNode[]
  ) => {
    return (
      <div className="variant-container">
        <p className="variant-option-header">{category}</p>
        <div className="variant-option">{options}</div>
      </div>
    )
  }

  handleButtonClick = () => {}

  renderVariantOptions = () => {
    const { variants } = this.props
    const { selectedVariant } = this.state

    const sizeUI: React.ReactNode[] = []
    const colorsUI: React.ReactNode[] = []

    const processData: string[] = []
    const variantButtonClassName = "variant-option-button"

    variants.forEach(({ size, color }) => {
      if (!processData.includes(size)) {
        sizeUI.push(
          <Button
            className={`${variantButtonClassName} size`}
            key={size}
            selected={selectedVariant.size === size}
            onClick={this.handleButtonClick}
          >
            {size}
          </Button>
        )
      }

      if (!processData.includes(color)) {
        console.log("color", color)
        const arrayColors = color.split("&")
        const backgroundStyle: React.CSSProperties =
          arrayColors.length > 1
            ? {
                backgroundImage: `linear-gradient(${arrayColors.join(",")})`,
              }
            : { backgroundColor: color }
        colorsUI.push(
          <Button
            style={backgroundStyle}
            className={`${variantButtonClassName} color`}
            key={color}
            selected={selectedVariant.color === color}
            onClick={() => {}}
          ></Button>
        )
      }
      processData.push(color)
      processData.push(size)
    })

    return (
      <div className="variant-options-container">
        {this.renderVariantOptionsContainer("Sizes", sizeUI)}
        {this.renderVariantOptionsContainer("Colors", colorsUI)}
      </div>
    )
  }
}
