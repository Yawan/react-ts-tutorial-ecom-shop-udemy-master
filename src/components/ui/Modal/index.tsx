import * as React from "react"
import ReactDOM from "react-dom"
import "./style.css"

export interface IModalProps {
  show?: boolean
  modalBodyClassName?: string
  onClickOutsideModal?(): void
}

export interface IModalState {}

export default class Modal extends React.Component<IModalProps, IModalState> {
  root: HTMLDivElement
  el: HTMLDivElement
  constructor(props: IModalProps) {
    super(props)
    this.root = document.querySelector("#root") as HTMLDivElement
    this.el = document.createElement("div")
  }
  componentDidMount() {
    this.root.appendChild(this.el)
  }
  componentWillUnmount() {
    this.root.removeChild(this.el)
  }

  removeOnClickPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  onClickOutsideModal = () => {
    const { onClickOutsideModal } = this.props
    onClickOutsideModal && onClickOutsideModal()
  }

  render() {
    const { show, modalBodyClassName } = this.props
    return show
      ? ReactDOM.createPortal(
          <div
            onClick={this.removeOnClickPropagation}
            className="modal-container"
          >
            <div onClick={this.onClickOutsideModal} className="modal-overlay" />
            <div className={`modal-body ${modalBodyClassName || ""}`}>
              {this.props.children}
            </div>
          </div>,
          this.el
        )
      : null
  }
}
