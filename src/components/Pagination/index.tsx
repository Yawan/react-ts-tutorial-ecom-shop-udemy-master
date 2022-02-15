import React, { useContext, useState } from "react"
import { ThemeContext } from "../../context/ThemeContext"
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

const Pagination: React.FunctionComponent<IPaginationProps> = ({
  numberOfPages,
  onChange,
  overrideSelectedPage,
}) => {
  const theme = useContext(ThemeContext)
  const [selectedPage, setSelectedPage] = useState(1)

  const currentSelectedPage: number = overrideSelectedPage || selectedPage

  const handleLeftCaretClick = (): void => {
    const newPage =
      currentSelectedPage === 1 ? currentSelectedPage : currentSelectedPage - 1

    handlePageClick(newPage)()
  }

  const handleRightCaretClick = (): void => {
    const newPage =
      currentSelectedPage === numberOfPages
        ? currentSelectedPage
        : currentSelectedPage + 1

    handlePageClick(newPage)()
  }

  // return a callback function to handle selectedPage in state.
  const handlePageClick = (page: number) => () => {
    if (selectedPage !== page) {
      setSelectedPage(page)
      onChange(page)
    }
  }

  const renderPageButtons = () => {
    return [...new Array(numberOfPages)].map((_, index) => {
      const page = index + 1
      return (
        <Button
          key={page}
          selected={currentSelectedPage === page}
          onClick={handlePageClick(page)}
          className="page-button"
        >
          {page}
        </Button>
      )
    })
  }
  return (
    <div className={`pagination-container ${theme}`}>
      <i
        onClick={handleLeftCaretClick}
        className="fa fa-caret-left page-caret"
        aria-hidden="true"
      ></i>
      <div className="pages-container">{renderPageButtons()}</div>
      <i
        onClick={handleRightCaretClick}
        className="fa fa-caret-right page-caret"
        aria-hidden="true"
      ></i>
    </div>
  )
}

export default Pagination
