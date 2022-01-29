export type CustomerInfoField =
  | "completeName"
  | "address"
  | "city"
  | "stateOrProvince"
  | "mobileNo"

export type CustomerInfoFieldList = {
  [field in CustomerInfoField]: string
}

export const CUSTOMER_INFO_FIELD_LIST: CustomerInfoFieldList = {
  completeName: "Complete Name(LastName, FirstName M.I.)",
  address: "Address(House #, Lot, Blk, Street)",
  city: "City",
  stateOrProvince: "State/Province",
  mobileNo: "Mobile #",
}

export const CUSTOMER_INFO_FIELD_WIDTH = "Calc(100% - 20px)"
