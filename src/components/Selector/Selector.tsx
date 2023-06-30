import { FC, useState } from "react"
import classNames from "classnames/bind"
import s from "./Selector.module.scss"

interface SelectorProps {}

enum Tab {
  INTEGRATION = "integration",
  EXAMPLES = "examples",
}

export const Selector: FC<SelectorProps> = (props) => {
  const {} = props

  const [activeTab, setActiveTab] = useState<Tab>(Tab.EXAMPLES)

  const tabChange = (newTab: Tab) => setActiveTab((prev) => newTab)

  const isExamples = activeTab === Tab.EXAMPLES
  const isIntegration = activeTab === Tab.INTEGRATION

  const capitalizeFirstLetter = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1)

  const cn = classNames.bind(s)
  return (
    <div className={s.selector}>
      <div
        className={cn(isExamples && s.active)}
        onClick={() => tabChange(Tab.EXAMPLES)}
      >
        {capitalizeFirstLetter(Tab.EXAMPLES)}
      </div>
      <div
        className={cn(isIntegration && s.active)}
        onClick={() => tabChange(Tab.INTEGRATION)}
      >
        {capitalizeFirstLetter(Tab.INTEGRATION)}
      </div>
    </div>
  )
}
