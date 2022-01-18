import * as React from "react"
import "./style.scss"

export type ButtonType = "primary" | "default"

export interface IButtonProps {
  className?: string
  selected?: boolean
  type?: ButtonType
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const Button: React.FunctionComponent<IButtonProps> = ({
  children,
  type = "default",
  selected,
  onClick,
  className,
}) => {
  const selectedClass = selected ? "selected" : ""
  return (
    <button
      onClick={onClick}
      className={`btn btn-${type} ${selectedClass} ${className || ""}`}
    >
      {children}
    </button>
  )
}

export default Button
