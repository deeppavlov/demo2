import React, { FC, useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { routesForDemo } from "router"
import { Tabs } from "types"
import { capitalizeFirstLetter } from "utils"
import { useClassnames } from "hooks"
import s from "./Selector.module.scss"

interface SelectorProps {}

export const Selector: FC<SelectorProps> = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.EXAMPLES)

  const cn = useClassnames(s)
  const location = useLocation()
  const history = useHistory()

  const defaultRoute = routesForDemo.TokenClassification[0].link

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      history.push(`/${Tabs.EXAMPLES}/${defaultRoute}`)
      setActiveTab(Tabs.EXAMPLES)
    } else {
      setActiveTab(location.pathname.split("/")[1] as Tabs)
    }
  }, [defaultRoute, history, location.pathname])

  const tabChange = (newTab: Tabs) => {
    if (newTab === activeTab) return
    let newRoute = location.pathname.split("/")[2]

    history.push(`/${newTab}/${newRoute}`)
    setActiveTab(newTab)
  }

  const isExamples = activeTab === Tabs.EXAMPLES
  const isIntegration = activeTab === Tabs.INTEGRATION

  return (
    <div className={s.selector}>
      <div
        className={cn(s.btn, isExamples && s.active)}
        onClick={() => tabChange(Tabs.EXAMPLES)}
      >
        {capitalizeFirstLetter(Tabs.EXAMPLES)}
      </div>
      <div
        className={cn(s.btn, isIntegration && s.active)}
        onClick={() => tabChange(Tabs.INTEGRATION)}
      >
        {capitalizeFirstLetter(Tabs.INTEGRATION)}
      </div>
    </div>
  )
}
