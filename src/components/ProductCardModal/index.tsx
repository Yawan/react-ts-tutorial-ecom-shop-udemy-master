import * as React from "react"
import { Product } from "../../store/reducers/shopReducer"
import Modal from "../ui/Modal"
import "./style.scss"

export interface IProductCardModalProps {
  show: boolean
  product: Product
  onClickOutsideModal(): void
}

export interface IProductCardModalState {}

export default class ProductCardModal extends React.Component<
  IProductCardModalProps,
  IProductCardModalState
> {
  public render() {
    const { show, product, onClickOutsideModal } = this.props
    const { title, variants } = product
    const imageUrl = variants[0].image
    return (
      <Modal
        modalBodyClassName="product-card-modal-body"
        show={show}
        onClickOutsideModal={onClickOutsideModal}
      >
        <div className="modal-product-details-container">
          <div className="modal-product-image">
            <img src={imageUrl} alt={`product: ${title}`} />
          </div>
          <div className="modal-product-details">
            <p className="modal-product-name">{title}</p>
          </div>
        </div>
      </Modal>
    )
  }
}
