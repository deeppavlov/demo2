import React, { FC } from "react"
import s from "./Limiter.module.scss"

interface LimiterProps {
  children: React.ReactNode
}

export const Limiter: FC<LimiterProps> = (props) => {
  const { children } = props
  return <div className={s.limiter}>{children}</div>
}
