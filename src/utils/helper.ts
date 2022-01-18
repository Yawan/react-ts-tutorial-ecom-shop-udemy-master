import { ProductFilters } from "../store/reducers/shopReducer"

export const capitalizeFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase()

export const convertFiltersToCategories = (filters: ProductFilters) => {
  let categories: string[] = []
  Object.keys(filters).forEach((keyOfFilter) => {
    const categoryFilters = filters[keyOfFilter as keyof ProductFilters]
    if (categoryFilters.length) categories = categories.concat(categoryFilters)
  })

  return categories
}
