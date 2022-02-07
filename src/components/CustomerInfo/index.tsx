import update from "immutability-helper"
import React, { useMemo, useRef, useState } from "react"
import {
  CustomerInfoField,
  CustomerInfoFieldList,
  CUSTOMER_INFO_FIELD_ERROR,
  CUSTOMER_INFO_FIELD_LIST,
  CUSTOMER_INFO_FIELD_LIST_INITIAL_STATE,
  CUSTOMER_INFO_FIELD_WIDTH,
} from "../../constants/user"
import Button from "../ui/Button"
import Input from "../ui/Input"
import "./style.scss"

interface ICustomerInfoProps {}

export type CustomerInfoFieldRefs = {
  [field in CustomerInfoField]: React.RefObject<HTMLInputElement>
}

const CustomerInfo: React.FunctionComponent<ICustomerInfoProps> = (props) => {
  const fieldList = useMemo(() => Object.keys(CUSTOMER_INFO_FIELD_LIST), [])
  const initialFieldRefs = useMemo(() => {
    const refs = {} as CustomerInfoFieldRefs
    fieldList.forEach((key) => {
      const stateKey = key as CustomerInfoField
      refs[stateKey] = React.createRef()
    })
    return refs
  }, [fieldList])

  const fieldRefs = useRef<CustomerInfoFieldRefs>(initialFieldRefs)
  const [fieldState, setFieldState] = useState<CustomerInfoFieldList>({
    ...CUSTOMER_INFO_FIELD_LIST_INITIAL_STATE,
  })
  const [fieldError, setFieldError] = useState<CustomerInfoFieldList>({
    ...CUSTOMER_INFO_FIELD_LIST_INITIAL_STATE,
  })
  const [isCompletePurchaseClick, setIsCompletePurchaseClick] =
    useState<Boolean>(false)

  const validateInputFields = (field: CustomerInfoField, value: string) => {
    const errorMessage = value ? "" : CUSTOMER_INFO_FIELD_ERROR
    setFieldError(update(fieldError, { [field]: { $set: errorMessage } }))
  }

  const handleInputOnChange =
    (field: CustomerInfoField) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget
      setFieldState(update(fieldState, { [field]: { $set: value } }))

      isCompletePurchaseClick && validateInputFields(field, value)
    }
  const renderInputs = () => {
    return fieldList.map((field) => {
      const customerInfoField = field as CustomerInfoField
      const label = CUSTOMER_INFO_FIELD_LIST[customerInfoField]

      return (
        <Input
          key={label}
          label={label}
          onChange={handleInputOnChange(customerInfoField)}
          inputContainerStyle={{ marginBottom: "10px" }}
          inputStyle={{ width: CUSTOMER_INFO_FIELD_WIDTH }}
          error={fieldError[customerInfoField]}
          positive={!!fieldState[customerInfoField]}
          inputRef={fieldRefs.current[customerInfoField]}
        />
      )
    })
  }

  const allFieldsAllValid = () => {
    let hasError = false
    const error: CustomerInfoFieldList = {
      ...CUSTOMER_INFO_FIELD_LIST_INITIAL_STATE,
    }

    let hasFocusToErrorField = false
    fieldList.forEach((key) => {
      const stateKey = key as CustomerInfoField
      if (!fieldState[stateKey]) {
        error[stateKey] = CUSTOMER_INFO_FIELD_ERROR
        hasError = true

        if (!hasFocusToErrorField) {
          hasFocusToErrorField = true
          const fieldRef = fieldRefs.current[stateKey]
          fieldRef.current && fieldRef.current.focus()
        }
      }
    })

    setFieldError(error)
    return !hasError
  }

  const handleButtonClick = () => {
    setIsCompletePurchaseClick(true)
    if (allFieldsAllValid()) {
      // todo: show modal
      console.log("todo modal")
    }
  }

  return (
    <div className="customer-info-container">
      <div className="heading">Billing Information</div>
      {renderInputs()}
      <Button
        type="primary"
        className="complete-purchase-btn"
        style={{ width: CUSTOMER_INFO_FIELD_WIDTH }}
        onClick={handleButtonClick}
      >
        Complete Purchase
      </Button>
    </div>
  )
}

export default CustomerInfo
