import * as React from "react"
import { ProductVariantsCompleteDetails } from "../../store/reducers/shopReducer"
import { VariantsAvailableOptions } from "../../utils/product"
import Button from "../ui/Button"
import Modal from "../ui/Modal"
import Price from "./Price"
import Quantity from "./Quantity"
import "./style.scss"
import VariantOptions from "./VariantOptions"

export interface IProductCardModalProps {
  show: boolean
  // product: Product
  initialVariant: ProductVariantsCompleteDetails
  variants: ProductVariantsCompleteDetails[]
  variantsAvailableOptions: VariantsAvailableOptions
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
  constructor(props: IProductCardModalProps) {
    super(props)

    this.state = { selectedVariant: props.initialVariant, quantity: 1 }
  }

  handleClickPlus = () => {
    const { quantity, selectedVariant } = this.state
    selectedVariant.stock > quantity &&
      this.setState({ quantity: quantity + 1 })
  }
  handleClickMinus = () => {
    const { quantity } = this.state
    quantity > 1 && this.setState({ quantity: quantity - 1 })
  }
  handleSizeChange = (size: string) => {
    const { selectedVariant } = this.state
    const { variants } = this.props

    if (selectedVariant.size !== size) {
      this.setState({
        selectedVariant: variants.filter(
          (variant) => variant.size === size && variant.stock > 0
        )[0],
      })
    }
  }
  handleColorChange = (color: string) => {
    const { selectedVariant } = this.state
    const { variants } = this.props

    if (selectedVariant.color !== color) {
      this.setState({
        selectedVariant: variants.filter(
          (variant) =>
            variant.size === selectedVariant.size &&
            variant.color === color &&
            variant.stock > 0
        )[0],
      })
    }
  }
  render() {
    const { show, variants, onClickOutsideModal, variantsAvailableOptions } =
      this.props
    const { selectedVariant, quantity } = this.state
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
            <Price selectedVariant={selectedVariant} />
            <Quantity
              quantity={quantity}
              onClickMinus={this.handleClickMinus}
              onClickPlus={this.handleClickPlus}
            />
            <VariantOptions
              variants={variants}
              selectedVariant={selectedVariant}
              variantsAvailableOptions={variantsAvailableOptions}
              onSizeChanged={this.handleSizeChange}
              onColorChanged={this.handleColorChange}
            />
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
}
