import * as React from "react"
import ShopQuality from "../../components/ShopQuality"
import "./style.scss"

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
    <div className="homepage-container">
      <div className="cover-image" />
      <ShopQuality />
    </div>
  )
}

export default HomePage
