import * as React from "react"
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

export default class Popover extends React.Component<
  IPopoverProps,
  IPopoverState
> {
  root: HTMLDivElement
  el: HTMLDivElement
  childrenRef: React.RefObject<HTMLElement>
  popperRef: React.RefObject<HTMLDivElement>
  constructor(props: IPopoverProps) {
    super(props)
    this.root = document.querySelector("#root") as HTMLDivElement
    this.el = document.createElement("div")
    this.childrenRef = React.createRef()
    this.popperRef = React.createRef()

    this.state = {
      show: false,
      childrenPosition: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      contentWidth: 0,
    }
  }

  componentDidMount() {
    this.root.appendChild(this.el)
    setTimeout(() => {
      const childrenElement = this.childrenRef.current
      if (childrenElement) {
        const { top, left, bottom, right } =
          childrenElement.getBoundingClientRect()
        this.setState({ childrenPosition: { top, left, bottom, right } })
      }
    }, 500)
  }
  componentWillUnmount() {
    this.root.removeChild(this.el)
  }

  getShowValue = () => {
    const { controlShow } = this.props
    const { show } = this.state
    return controlShow === undefined ? show : controlShow
  }

  handleContentClick = () => {
    const { controlShow, onClick } = this.props
    controlShow === undefined && this.setState({ show: !this.state.show })
    onClick && onClick()
  }

  renderChildrenElement = () => {
    return React.cloneElement(this.props.children as React.ReactElement, {
      ref: this.childrenRef,
      onClick: this.handleContentClick,
    })
  }

  // access [contentWidth] when updated.
  componentDidUpdate(prevProps: IPopoverProps, prevState: IPopoverState) {
    const { contentWidth } = this.state
    const popperWidth = this.popperRef.current
      ? this.popperRef.current.getBoundingClientRect().width
      : 0

    if (
      (!contentWidth || popperWidth !== contentWidth) &&
      this.getShowValue()
    ) {
      this.setState({ contentWidth: popperWidth })
    }
  }

  renderPopover = () => {
    const { content, position, popoverBodyClassName } = this.props
    const { childrenPosition, contentWidth } = this.state
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
    return this.getShowValue()
      ? ReactDOM.createPortal(
          <div
            className="popover-content-container"
            style={style}
            ref={this.popperRef}
          >
            <div className={`popover-body ${popoverBodyClassName || ""}`}>
              {content}
            </div>
          </div>,
          this.el
        )
      : null
  }

  render() {
    return (
      <React.Fragment>
        {this.renderChildrenElement()}
        {this.renderPopover()}
      </React.Fragment>
    )
  }
}
