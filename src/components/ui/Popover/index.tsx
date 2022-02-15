import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import "./style.css"

export interface PopoverChildrenPosition {
  top: number
  right: number
  left: number
  bottom: number
}

/**
 * pop over this component,
 *   [content]: the content to be pop over
 *   [position]: display at the bottom (left or right) of the children element;
 *   [controlShow]
 *  */

export interface IPopoverProps {
  content: React.ReactNode
  position: "bottom-left" | "bottom-right"
  popoverBodyClassName?: string
  controlShow?: boolean
  onClick?(): void
}

export interface IPopoverState {
  show: boolean
  childrenPosition: PopoverChildrenPosition
  contentWidth: number
}
const Popover: React.FunctionComponent<IPopoverProps> = ({
  children,
  controlShow,
  onClick,
  content,
  position,
  popoverBodyClassName,
}) => {
  const root = useRef(document.querySelector("#root") as HTMLDivElement)
  const el = useRef(document.createElement("div"))

  const childrenRef = useRef<HTMLElement>(null)
  const popperRef = useRef<HTMLDivElement>(null)

  const [show, setShow] = useState(false)
  const [childrenPosition, setChildrenPosition] =
    useState<PopoverChildrenPosition>({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    })
  const [contentWidth, setContentWidth] = useState(0)

  const handleContentClick = () => {
    controlShow === undefined && setShow(!show)
    onClick && onClick()
  }

  const ChildrenElement = React.cloneElement(children as React.ReactElement, {
    ref: childrenRef,
    onClick: handleContentClick,
  })

  useEffect(() => {
    root.current.appendChild(el.current)

    setTimeout(() => {
      const childrenElement = childrenRef.current
      if (childrenElement) {
        const { top, left, bottom, right } =
          childrenElement.getBoundingClientRect()
        setChildrenPosition({ top, left, bottom, right })
      }
    }, 500)

    return function cleanup() {
      root.current.removeChild(el.current)
    }
  })

  // access [contentWidth] when updated.
  useLayoutEffect(() => {
    const popperWidth = popperRef.current
      ? popperRef.current.getBoundingClientRect().width
      : 0

    if ((!contentWidth || popperWidth !== contentWidth) && getShowValue()) {
      setContentWidth(popperWidth)
    }
  })

  const getShowValue = () => {
    return controlShow === undefined ? show : controlShow
  }

  const renderPopover = () => {
    let style: React.CSSProperties

    /*
      depending on the type of [position]
      assign it to style, 
      and apply this style to the container which shows the popover.
    */
    switch (position) {
      case "bottom-left":
        style = {
          top: childrenPosition.bottom,
          left: childrenPosition.right - contentWidth,
        }
        break
      case "bottom-right":
        style = {
          top: childrenPosition.bottom,
          left: childrenPosition.left,
        }
        break
    }
    return getShowValue()
      ? ReactDOM.createPortal(
          <div
            className="popover-content-container"
            style={style}
            ref={popperRef}
          >
            <div className={`popover-body ${popoverBodyClassName || ""}`}>
              {content}
            </div>
          </div>,
          el.current
        )
      : null
  }

  return (
    <React.Fragment>
      {ChildrenElement}
      {renderPopover()}
    </React.Fragment>
  )
}

export default Popover
