import * as React from "react"
import { Link } from "react-router-dom"
import { ROUTE } from "../../constants/route"
import ShoppingCart from "../ShoppingCart"
import "./style.scss"

interface IHeaderNavigationProps {}

const HeaderNavigation: React.FunctionComponent<IHeaderNavigationProps> = (
  props
) => {
  return (
    <div className="header-nav-container">
      <div className="nav-items-left">
        <Link className="nav-item shopname" to={ROUTE.HOME}>
          SHOP-HOME
        </Link>
        <Link className="nav-item" to={ROUTE.ALL_PRODUCTS}>
          All Products
        </Link>
      </div>
      <div className="nav-items-right">
        <ShoppingCart />
      </div>
    </div>
  )
}

export default HeaderNavigation
