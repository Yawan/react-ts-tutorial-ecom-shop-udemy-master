import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import "./style.css"

export interface IModalProps {
  show?: boolean
  modalBodyClassName?: string
  onClickOutsideModal?(): void
}

const Modal: React.FunctionComponent<IModalProps> = ({
  show,
  modalBodyClassName,
  onClickOutsideModal,
  children,
}) => {
  const root = useRef(document.querySelector("#root") as HTMLDivElement)
  const el = useRef(document.createElement("div"))

  useEffect(() => {
    root.current.appendChild(el.current)
    return function cleanup() {
      root.current.removeChild(el.current)
    }
  })

  const removeOnClickPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  const handleOnClickOutsideModal = () => {
    onClickOutsideModal && onClickOutsideModal()
  }

  return show
    ? ReactDOM.createPortal(
        <div onClick={removeOnClickPropagation} className="modal-container">
          <div onClick={handleOnClickOutsideModal} className="modal-overlay" />
          <div className={`modal-body ${modalBodyClassName || ""}`}>
            {children}
          </div>
        </div>,
        el.current
      )
    : null
}

export default Modal
