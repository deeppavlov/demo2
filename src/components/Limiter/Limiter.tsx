import React, { FC } from "react"
import s from "./Limiter.module.scss"

interface LimiterProps {}

export const Limiter: FC<LimiterProps> = (props) => {
  const { children } = props
  return <div className={s.limiter}>{children}</div>
}