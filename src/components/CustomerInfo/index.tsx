import * as React from "react"
import {
  CustomerInfoField,
  CUSTOMER_INFO_FIELD_LIST,
  CUSTOMER_INFO_FIELD_WIDTH,
} from "../../constants/user"
import Button from "../ui/Button"
import Input from "../ui/Input"
import "./style.scss"

interface ICustomerInfoProps {}

const CustomerInfo: React.FunctionComponent<ICustomerInfoProps> = (props) => {
  const handleInputOnChange = (field: CustomerInfoField) => () => {}
  const renderInputs = () => {
    return Object.keys(CUSTOMER_INFO_FIELD_LIST).map((field) => {
      const customerInfoField = field as CustomerInfoField
      const label = CUSTOMER_INFO_FIELD_LIST[customerInfoField]

      return (
        <Input
          key={label}
          label={label}
          onChange={handleInputOnChange(customerInfoField)}
          inputContainerStyle={{ marginBottom: "10px" }}
          inputStyle={{ width: CUSTOMER_INFO_FIELD_WIDTH }}
        />
      )
    })
  }
  return (
    <div className="customer-info-container">
      <div className="heading">Billing Information</div>
      {renderInputs()}
      <Button
        type="primary"
        className="complete-purchase-btn"
        style={{ width: CUSTOMER_INFO_FIELD_WIDTH }}
        onClick={() => {}}
      >
        Complete Purchase
      </Button>
    </div>
  )
}

export default CustomerInfo
