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

export const omit = (obj: any, keysToOmit: string[]) => {
  let newObj: any = {}
  Object.keys(obj).forEach((key) => {
    if (!keysToOmit.includes(key)) {
      newObj[key] = obj[key]
    }
  })
  return newObj
}

export const logErrorToMyService = (error: any, errorInfo: any) => {
  // todo: implementation on product
  console.error(error, errorInfo)
}
