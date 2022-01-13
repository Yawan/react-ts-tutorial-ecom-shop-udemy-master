import React, { useState } from "react"
import "./style.scss"

interface ICheckBoxProps {
  initialState?: boolean
  onChange(value: boolean): void
}

const Checkbox: React.FunctionComponent<ICheckBoxProps> = (props) => {
  const [isChecked, setIsChecked] = useState(props.initialState || false)

  const iconClassName = isChecked ? "fa fa-check-square" : "fa fa-square-o"

  const handleCheckboxClick = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    props.onChange(newValue)
  }
  return (
    <label className="checkbox-container" onClick={handleCheckboxClick}>
      <i className={`${iconClassName} checkbox-icon`} aria-hidden="true"></i>
      <span className="checkbox-children">{props.children}</span>
    </label>
  )
}

export default Checkbox
