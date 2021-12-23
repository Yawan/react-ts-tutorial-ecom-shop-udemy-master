import * as React from "react"
import Partners from "../../components/Parters"
import ShopQuality from "../../components/ShopQuality"
import BestSeller from "../BestSeller"
import "./style.scss"

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
    <div className="homepage-container">
      <div className="cover-image" />
      <ShopQuality />
      <BestSeller />
      <Partners />
    </div>
  )
}

export default HomePage
