import React, { FC } from "react"
import classNames from "classnames/bind"
import { Snippets } from "types"
import s from "./Switcher.module.scss"

interface SwitcherProps {
  activeTab: Snippets
  setActiveTab: Function
}

export const Switcher: FC<SwitcherProps> = (props) => {
  const { activeTab, setActiveTab } = props

  const cn = classNames.bind(s)

  const cliHandler = () => {
    setActiveTab(() => Snippets.cli)
  }
  const pythonHandler = () => {
    setActiveTab(() => Snippets.python)
  }
  const restAPIHandler = () => {
    setActiveTab(() => Snippets.restApi)
  }

  const isCLI = activeTab === Snippets.cli
  const isPython = activeTab === Snippets.python
  const isRestAPI = activeTab === Snippets.restApi

  return (
    <div className={s.switcher}>
      <button
        onClick={cliHandler}
        className={cn("switch", "left", isCLI && "active")}
      >
        CLI
      </button>
      <button
        onClick={pythonHandler}
        className={cn(
          "switch",
          "middle",
          isCLI && "leftActive",
          isRestAPI && "rightActive",
          isPython && "active"
        )}
      >
        Python
      </button>
      <button
        onClick={restAPIHandler}
        className={cn("switch", "right", isRestAPI && "active")}
      >
        Rest API
      </button>
    </div>
  )
}
