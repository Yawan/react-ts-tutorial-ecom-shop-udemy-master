import * as React from "react"
import ReactDOM from "react-dom"
import "./style.css"

export interface IModalProps {
  show?: boolean
  modalBodyClassName?: string
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

  render() {
    const { show, modalBodyClassName } = this.props
    return show
      ? ReactDOM.createPortal(
          <div onClick={(e) => e.stopPropagation()} className="modal-container">
            <div className="modal-overlay" />
            <div className={`modal-body ${modalBodyClassName || ""}`}>
              {this.props.children}
            </div>
          </div>,
          this.el
        )
      : null
  }
}
