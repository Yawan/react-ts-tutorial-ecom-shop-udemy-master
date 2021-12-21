import * as React from "react"
import "./style.scss"

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
    <div className="homepage-container">
      <div className="cover-image"></div>
    </div>
  )
}

export default HomePage
