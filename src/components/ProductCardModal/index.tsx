import React, { Dispatch, useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { UserActionType } from "../../store/action-types"
import { UserAction } from "../../store/actions/UserAction"
import { ProductVariantsCompleteDetails } from "../../store/reducers/shopReducer"
import { ProductPurchase } from "../../store/reducers/userReducer"
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
const ProductCardModal: React.FunctionComponent<IProductCardModalProps> = ({
  show,
  variants,
  onClickOutsideModal,
  variantsAvailableOptions,
  initialVariant,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(initialVariant)
  const [quantity, setQuantity] = useState(1)
  const dispatch: Dispatch<UserAction> = useDispatch()

  const addToCart = useCallback(
    (productPurchase: ProductPurchase) => {
      dispatch({
        type: UserActionType.ADD_TO_CART,
        productPurchase,
      })
    },
    [dispatch]
  )

  const handleAddToCart = () => {
    addToCart({ ...selectedVariant, quantity })
  }

  const handleClickPlus = () => {
    selectedVariant.stock > quantity && setQuantity((quantity) => quantity + 1)
  }
  const handleClickMinus = () => {
    quantity > 1 && setQuantity((quantity) => quantity - 1)
  }
  const handleSizeChange = (size: string) => {
    if (selectedVariant.size !== size) {
      setSelectedVariant(
        variants.filter(
          (variant) => variant.size === size && variant.stock > 0
        )[0]
      )
    }
  }
  const handleColorChange = (color: string) => {
    if (selectedVariant.color !== color) {
      setSelectedVariant(
        variants.filter(
          (variant) =>
            variant.size === selectedVariant.size &&
            variant.color === color &&
            variant.stock > 0
        )[0]
      )
    }
  }

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
            onClickMinus={handleClickMinus}
            onClickPlus={handleClickPlus}
          />
          <VariantOptions
            variants={variants}
            selectedVariant={selectedVariant}
            variantsAvailableOptions={variantsAvailableOptions}
            onSizeChanged={handleSizeChange}
            onColorChanged={handleColorChange}
          />
          <Button
            className="add-to-cart-button"
            type="primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ProductCardModal
