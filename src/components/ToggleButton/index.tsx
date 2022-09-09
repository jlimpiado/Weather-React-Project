import React, { ChangeEvent } from "react"
import { ThemeContext } from "../ThemeProvider"
import style from "./togglebtn.module.css"

export default function ToggleButton(): JSX.Element {
  const theme = React.useContext(ThemeContext)

  const checkToggle = (evt: ChangeEvent<HTMLInputElement>) => {
    theme?.setTheme(evt.target.checked ? "dark" : "light")
  }

  return (
    <div className="absolute right-1 top-0">
      <input
        type="checkbox"
        id="togglebtn"
        className={style.switchCheck}
        onChange={checkToggle}
        defaultChecked
      />
      <label htmlFor="togglebtn" className={style.switchLabel} />
    </div>
  )
}
