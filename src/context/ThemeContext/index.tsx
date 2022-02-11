import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import Button from "../../components/ui/Button"
import { capitalizeFirstLetter } from "../../utils/helper"
import "./style.css"

interface IThemeContextProviderProps {}

export type ThemeContextValue = "light" | "dark"

const root = document.querySelector("#root") as HTMLDivElement
const el = document.createElement("div")
const body = document.querySelector("body") as HTMLBodyElement

export const ThemeContext = React.createContext<ThemeContextValue>("light")

const ThemeContextProvider: React.FunctionComponent<
  IThemeContextProviderProps
> = ({ children }) => {
  useEffect(() => {
    root.appendChild(el)
    return () => {
      root.removeChild(el)
    }
  }, [])

  const [theme, setTheme] = React.useState<ThemeContextValue>("light")

  const handleChangeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }
  body.style.backgroundColor = theme === "light" ? "white" : "black"
  const themeButton = ReactDOM.createPortal(
    <Button
      className={`theme-context-button ${theme}`}
      onClick={handleChangeTheme}
    >{`${capitalizeFirstLetter(theme)} Mode`}</Button>,
    el
  )

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`app-container ${theme}`}>{children}</div>
      {themeButton}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
