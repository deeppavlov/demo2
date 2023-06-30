import React, { FC } from "react"
import Pavlov from "../../assets/pavlov.svg"
import s from "./Top.module.scss"
import { Limiter } from "components/Limiter/Limiter"

interface TopProps {}

export const Top: FC<TopProps> = (props) => {
  const { children } = props
  return (
    <div className="accentColor border">
      <Limiter>
        <header className={s.header}>
          <div className={s.middle}>
            <div className={s.left}>
              <p className={s.title}>
                <a href="https://deeppavlov.ai">
                  <span className={s.blue}>DeepPavlov</span>
                </a>
                <span>
                  <span>DeepPavlov</span>
                </span>
              </p>
              <span className={s.check}>
                Check and try our product's demo with us.
                <br /> Stay tuned
              </span>
            </div>
            <div className={s.right}>
              <img src={Pavlov} alt="" />
            </div>
          </div>
          {children}
        </header>
      </Limiter>
    </div>
  )
}
