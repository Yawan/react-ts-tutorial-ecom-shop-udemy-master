import * as React from "react"
import Button from "../ui/Button"
import "./style.scss"

export interface IPaginationProps {
  numberOfPages: number
  onChange(selectedPage: number): void
  overrideSelectedPage?: number
}

export interface IPaginationState {
  selectedPage: number
}

export default class Pagination extends React.Component<
  IPaginationProps,
  IPaginationState
> {
  constructor(props: IPaginationProps) {
    super(props)

    this.state = { selectedPage: 1 }
  }

  currentSelectedPage = (): number => {
    const { overrideSelectedPage } = this.props
    const { selectedPage } = this.state

    return overrideSelectedPage || selectedPage
  }

  handleLeftCaretClick = (): void => {
    const currentSelectedPage = this.currentSelectedPage()
    const newPage =
      currentSelectedPage === 1 ? currentSelectedPage : currentSelectedPage - 1

    this.setState({ selectedPage: newPage })
    this.props.onChange(newPage)
  }

  handleRightCaretClick = (): void => {
    const { numberOfPages } = this.props
    const currentSelectedPage = this.currentSelectedPage()
    const newPage =
      currentSelectedPage === numberOfPages
        ? currentSelectedPage
        : currentSelectedPage + 1

    this.setState({ selectedPage: newPage })
    this.props.onChange(newPage)
  }

  // return a callback function to handle selectedPage in state.
  handlePageClick = (page: number) => () => {
    const { selectedPage } = this.state
    if (selectedPage !== page) {
      this.setState({ selectedPage: page })
      this.props.onChange(page)
    }
  }

  renderPageButtons = () => {
    const { numberOfPages } = this.props
    const currentSelectedPage = this.currentSelectedPage()
    return [...new Array(numberOfPages)].map((_, index) => {
      const page = index + 1
      return (
        <Button
          key={page}
          selected={currentSelectedPage === page}
          onClick={this.handlePageClick(page)}
          className="page-button"
        >
          {page}
        </Button>
      )
    })
  }
  public render() {
    return (
      <div className="pagination-container">
        <i
          onClick={this.handleLeftCaretClick}
          className="fa fa-caret-left page-caret"
          aria-hidden="true"
        ></i>
        <div className="pages-container">{this.renderPageButtons()}</div>
        <i
          onClick={this.handleRightCaretClick}
          className="fa fa-caret-right page-caret"
          aria-hidden="true"
        ></i>
      </div>
    )
  }
}
