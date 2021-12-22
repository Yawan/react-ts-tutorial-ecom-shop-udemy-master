import * as React from "react"
import "./style.scss"

interface IShopQualityProps {}

const ShopQuality: React.FunctionComponent<IShopQualityProps> = (props) => {
  return (
    <div className="shop-quality-container">
      <div className="quality-item-container">
        <div className="img-container support-local" />
        <h3>Support Local </h3>
        <p>
          All materials come from local pruducers. Together we can create a
          stronger and better community.
        </p>
      </div>
      <div className="quality-item-container">
        <div className="img-container high-quality" />
        <h3>High Quality</h3>
        <p>Material used are high quality proves to last for many years.</p>
      </div>
      <div className="quality-item-container">
        <div className="img-container eco-friendly" />
        <h3>Eco Friendly</h3>
        <p>
          Rest assured that the process and materials used will never harm our
          environment.
        </p>
      </div>
    </div>
  )
}

export default ShopQuality
