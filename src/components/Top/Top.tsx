import React, { FC } from "react"
import Pavlov from "assets/images/pavlov.svg"
import { Limiter } from "components"
import s from "./Top.module.scss"

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
                <h1>DeepPavlov</h1>
              </p>
              <span className={s.check}>
                Check and try our product's demo with us.
                <br /> Stay tuned
              </span>
            </div>
            <div className={s.right}>
              <img src={Pavlov} alt="DeepPavlov Logo" />
            </div>
          </div>
          {children}
        </header>
      </Limiter>
    </div>
  )
}
