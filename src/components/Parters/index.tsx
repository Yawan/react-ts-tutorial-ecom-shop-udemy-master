import * as React from "react"
import "./style.scss"

interface IPartnersProps {}

const Partners: React.FunctionComponent<IPartnersProps> = (props) => {
  return (
    <div className="partners-container">
      <h2>Trusted by Our Partners</h2>
      <div className="partners-list">
        <div className="partner-item amazon" />
        <div className="partner-item shopify" />
        <div className="partner-item wix" />
      </div>
    </div>
  )
}

export default Partners
