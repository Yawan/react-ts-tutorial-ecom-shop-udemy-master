import * as React from "react"
import { ProductVariantsCompleteDetails } from "../../store/reducers/shopReducer"
import {
  getBackgroundColorStyleForButton,
  VariantsAvailableOptions,
} from "../../utils/product"
import Button from "../ui/Button"

interface IVariantOptionsProps {
  variants: ProductVariantsCompleteDetails[]
  selectedVariant: ProductVariantsCompleteDetails
  variantsAvailableOptions: VariantsAvailableOptions
  onSizeChanged(size: string): void
  onColorChanged(color: string): void
}

const VariantOptions: React.FunctionComponent<IVariantOptionsProps> = ({
  variants,
  selectedVariant,
  variantsAvailableOptions,
  onSizeChanged,
  onColorChanged,
}) => {
  const renderVariantOptionsContainer = (
    category: string,
    options: React.ReactNode[]
  ) => {
    return (
      <div className="variant-container">
        <p className="variant-option-header">{category}</p>
        <div className="variant-option">{options}</div>
      </div>
    )
  }

  const sizeUI: React.ReactNode[] = []
  const colorsUI: React.ReactNode[] = []

  const processData: string[] = []
  const variantButtonClassName = "variant-option-button"

  const handleSizeChange = (size: string) => () => {
    onSizeChanged(size)
  }
  const handleColorChange = (color: string) => () => {
    onColorChanged(color)
  }
  variants.forEach(({ size }) => {
    if (!processData.includes(size)) {
      sizeUI.push(
        <Button
          className={`${variantButtonClassName} size`}
          key={size}
          selected={selectedVariant.size === size}
          onClick={handleSizeChange(size)}
          disabled={!variantsAvailableOptions[size]}
        >
          {size}
        </Button>
      )
    }
    processData.push(size)
  })

  variantsAvailableOptions[selectedVariant.size].forEach((color) => {
    const backgroundStyle: React.CSSProperties =
      getBackgroundColorStyleForButton(color)

    colorsUI.push(
      <Button
        style={backgroundStyle}
        className={`${variantButtonClassName} color`}
        key={color}
        selected={selectedVariant.color === color}
        onClick={handleColorChange(color)}
      ></Button>
    )
  })
  return (
    <div className="variant-options-container">
      {renderVariantOptionsContainer("Sizes", sizeUI)}
      {renderVariantOptionsContainer("Colors", colorsUI)}
    </div>
  )
}

export default VariantOptions
