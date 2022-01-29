import * as React from "react"

interface IInputProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  error?: string
  positive?: boolean
  inputStyle?: React.CSSProperties
  inputContainerStyle?: React.CSSProperties
  label: string
}

const Input: React.FunctionComponent<IInputProps> = ({
  onChange,
  error,
  positive,
  inputStyle,
  inputContainerStyle,
  label,
}) => {
  const overrideClassName =
    (error && "error-ui") || (positive && "positive-ui") || ""
  return (
    <div className="input-container" style={inputContainerStyle}>
      <div className="label">{label}</div>
      <input
        className={overrideClassName}
        style={inputStyle}
        onChange={onChange}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default Input
