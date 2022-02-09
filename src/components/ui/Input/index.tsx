import * as React from "react"
import "./style.scss"
interface IInputProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  error?: string
  positive?: boolean
  inputStyle?: React.CSSProperties
  inputContainerStyle?: React.CSSProperties
  label: string
  inputRef?: React.RefObject<HTMLInputElement>
}

const Input: React.FunctionComponent<IInputProps> = ({
  onChange,
  error,
  positive,
  inputStyle,
  inputContainerStyle,
  label,
  inputRef,
}) => {
  const overrideClassName =
    (error && "error-ui") || (positive && "positive-ui") || ""
  return (
    <div className="input-container" style={inputContainerStyle}>
      <div className="label">{label}</div>
      <input
        ref={inputRef}
        className={overrideClassName}
        style={inputStyle}
        onChange={onChange}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default Input
