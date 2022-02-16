import React, { Dispatch, useCallback } from "react"
import { useDispatch } from "react-redux"
import { UserActionType } from "../../store/action-types"
import { UserAction } from "../../store/actions/UserAction"
import { ProductFilters } from "../../store/reducers/shopReducer"
import { capitalizeFirstLetter } from "../../utils/helper"
import Checkbox from "../ui/CheckBox"
import "./style.scss"

interface IAllProductsSideBarProps {
  productFilters: ProductFilters
  userFilters: ProductFilters
}

const AllProductsSideBar = React.memo<IAllProductsSideBarProps>(
  ({ productFilters, userFilters }) => {
    const dispatch: Dispatch<UserAction> = useDispatch()

    const updateUserFilters = useCallback(
      (filters: ProductFilters) => {
        dispatch({
          type: UserActionType.UPDATE_USER_FILTERS,
          filters,
        })
      },
      [dispatch]
    )

    const handleFilterChange =
      (filterKey: keyof ProductFilters, filterValue: string) =>
      (value: boolean) => {
        // todo: code review
        let newFilters = { ...userFilters }
        if (value) {
          newFilters[filterKey].push(filterValue)
        } else {
          newFilters[filterKey] = newFilters[filterKey].filter(
            (x) => x !== filterValue
          )
        }
        updateUserFilters(newFilters)
      }
    const renderFilters = () => {
      return Object.keys(productFilters).map((filterKey) => {
        const filterValues = productFilters[filterKey as keyof ProductFilters]
        return (
          <div className="product-filter" key={filterKey}>
            <p>{capitalizeFirstLetter(filterKey)}</p>
            {filterValues.map((filterValue) => {
              return (
                <div className="filter-checkbox" key={filterValue}>
                  <Checkbox
                    onChange={handleFilterChange(
                      filterKey as keyof ProductFilters,
                      filterValue
                    )}
                  >
                    {filterValue}
                  </Checkbox>
                </div>
              )
            })}
          </div>
        )
      })
    }
    return <div className="all-products-side-bar">{renderFilters()}</div>
  }
)

export default AllProductsSideBar
