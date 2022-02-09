import update from "immutability-helper"
import React, { Dispatch, useMemo, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import ShopAPI from "../../api/ShopAPI"
import { ROUTE } from "../../constants/route"
import {
  CustomerInfoField,
  CustomerInfoFieldList,
  CUSTOMER_INFO_FIELD_ERROR,
  CUSTOMER_INFO_FIELD_LIST,
  CUSTOMER_INFO_FIELD_LIST_INITIAL_STATE,
  CUSTOMER_INFO_FIELD_WIDTH,
} from "../../constants/user"
import { UserActionType } from "../../store/action-types"
import { UserAction } from "../../store/actions/UserAction"
import { ProductPurchase } from "../../store/reducers/userReducer"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Modal from "../ui/Modal"
import "./style.scss"

interface ICustomerInfoProps {
  cart: ProductPurchase[]
}

export type CustomerInfoFieldRefs = {
  [field in CustomerInfoField]: React.RefObject<HTMLInputElement>
}

const CustomerInfo: React.FunctionComponent<ICustomerInfoProps> = ({
  cart,
}) => {
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
    useState<boolean>(false)
  const [showThankYouModal, setShowThankYouModal] = useState(false)

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
      const shopAPI = new ShopAPI()

      shopAPI
        .postOrder({
          cart,
          user: fieldState,
        })
        .then(() => {
          // show modal after post Order.
          setShowThankYouModal(true)
        })
    }
  }

  const dispatch: Dispatch<UserAction> = useDispatch()
  let navigate = useNavigate()

  // handle modal's button
  const handleShopMoreClick = () => {
    dispatch({ type: UserActionType.CLEAN_CART })

    navigate(ROUTE.ALL_PRODUCTS)
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
      <Modal
        modalBodyClassName="customer-info-modal-body"
        show={showThankYouModal}
      >
        <div className="header">Thank you! We have received your order!</div>
        <p>Please wait 5 to 10 business days for your items to arrive.</p>
        <Button type="primary" onClick={handleShopMoreClick}>
          Buy more!
        </Button>
      </Modal>
    </div>
  )
}

export default CustomerInfo
