import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { reducer } from "./lib/store"
import { App } from "components"
import "styles/index.css"

const store = createStore(reducer)
const root = document.getElementById("root")

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)
