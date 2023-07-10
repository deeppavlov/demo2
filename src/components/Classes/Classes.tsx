import React, { FC } from "react"
import { useLocation } from "react-router-dom"
import { Links } from "router/Routes"
import { Tabs } from "types"
import {
  renderNerClasses,
  newIntent,
  newNer,
  topicClasses,
  sentimentClasses,
  insultClasses,
  emotionClasses,
  Classes as ClassesList,
} from "utils/utils"
import s from "./Classes.module.scss"

type tclasses = {
  [key in Links]?: ClassesList
}

interface ClassesProps {
  disableTip: boolean
}

export const Classes: FC<ClassesProps> = (props) => {
  const { disableTip } = props

  const location = useLocation()
  const pathName = location.pathname

  const type = pathName.split("/")[2] as Links

  const isNer = pathName === `/${Tabs.EXAMPLES}/${Links.tokenNer}`
  const isIntent = pathName === `/${Tabs.EXAMPLES}/${Links.textIntent}`
  const isTopic = pathName === `/${Tabs.EXAMPLES}/${Links.textTopic}`

  const classes: tclasses = {
    [Links.tokenNer]: newNer,
    [Links.textIntent]: newIntent,
    [Links.textTopic]: topicClasses,
    [Links.textSentiment]: sentimentClasses,
    [Links.textToxic]: insultClasses,
    [Links.textEmotion]: emotionClasses,
  }

  return (
    <div className={s.classesList}>
      {classes[type] && (
        <>
          <div className={s.title}>Classes</div>
          {isNer && (
            <span className={s.annotation}>
              <span className={s.click}>Click</span>
              on an <b>entity</b>
              to see its class description
            </span>
          )}
          <div className={s.classes}>
            {renderNerClasses(classes[type]!, disableTip)}
          </div>
        </>
      )}
    </div>
  )
}
