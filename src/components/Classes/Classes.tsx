import React, { FC } from "react"
import { useLocation } from "react-router-dom"
import { Links } from "router/Routes"
import {
  renderNerClasses,
  newIntent,
  ontonotesClasses,
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

  const classes: tclasses = {
    [Links.tokenNer]: ontonotesClasses,
    [Links.textIntent]: newIntent,
    [Links.textTopic]: topicClasses,
    [Links.textSentiment]: sentimentClasses,
    [Links.textToxic]: insultClasses,
    [Links.textEmotion]: emotionClasses,
  }

  const hideAnnotation =
    classes[type] && Object.values(classes[type]!).some((cls) => cls.text)

  return (
    <div className={s.classesList}>
      {classes[type] && (
        <>
          <div className={s.title}>Classes</div>
          {hideAnnotation && (
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
