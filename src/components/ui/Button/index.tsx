import * as React from "react"
import "./style.scss"

export type ButtonType = "primary" | "default"

export interface IButtonProps {
  className?: string
  selected?: boolean
  disabled?: boolean
  type?: ButtonType
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  style?: React.CSSProperties
}

const Button: React.FunctionComponent<IButtonProps> = ({
  children,
  type = "default",
  selected,
  disabled,
  onClick,
  className,
  style,
}) => {
  const selectedClass = selected ? "selected" : ""
  const disabledClass = disabled ? "disabled" : ""
  return (
    <button
      style={style}
      onClick={onClick}
      className={`btn btn-${type} ${selectedClass} ${disabledClass} ${
        className || ""
      }`}
    >
      {children}
    </button>
  )
}

export default Button
