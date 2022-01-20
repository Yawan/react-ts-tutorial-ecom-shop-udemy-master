import * as React from "react"
import { ProductVariantsCompleteDetails } from "../../store/reducers/shopReducer"
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

    this.state = { selectedVariant: props.initialVariant }
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
          <div className="modal-product-image">
            <img src={image} alt={`product: ${title}`} />
          </div>
          <div className="modal-product-details">
            <p className="modal-product-name">{title}</p>
          </div>
        </div>
      </Modal>
    )
  }
}
