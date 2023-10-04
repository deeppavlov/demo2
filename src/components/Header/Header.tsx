import React, { FC } from "react"
import { useScrollShadow } from "hooks"
import { Buttons, Limiter } from "components"
import s from "./Header.module.scss"

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { ref } = useScrollShadow()
  return (
    <div ref={ref} className="accentColor sticky">
      <Limiter>
        <div className={s.top}>
          <h2 className={s.subtitle}>demo.deeppavlov.ai</h2>
          <Buttons reverse />
        </div>
      </Limiter>
    </div>
  )
}
