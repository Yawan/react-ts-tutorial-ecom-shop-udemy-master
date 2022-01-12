import * as React from "react"
import { ProductFilters } from "../../store/reducers/shopReducer"
import Checkbox from "../ui/CheckBox"
import "./style.scss"

interface IAllProductsSideBarProps {
  productFilters: ProductFilters
}

const AllProductsSideBar: React.FunctionComponent<IAllProductsSideBarProps> = ({
  productFilters,
}) => {
  const renderFilters = () => {
    return Object.keys(productFilters).map((filterKey) => {
      const filterValues = productFilters[filterKey as keyof ProductFilters]
      return (
        <div className="product-filter" key={filterKey}>
          <p>{filterKey}</p>
          {filterValues.map((filterValue) => {
            return (
              <div className="filter-checkbox" key={filterValue}>
                <Checkbox>{filterValue}</Checkbox>
              </div>
            )
          })}
        </div>
      )
    })
  }
  return <div className="all-products-side-bar">{renderFilters()}</div>
}

export default AllProductsSideBar
