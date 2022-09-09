import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/weather-icons.min.css"
import "./styles/index.css"
import App from "./App"
import { Background, ThemeProvider } from "./components"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Background>
        <App />
      </Background>
    </ThemeProvider>
  </React.StrictMode>,
)
