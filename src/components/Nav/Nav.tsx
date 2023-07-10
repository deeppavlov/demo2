import React, { FC } from "react"
import { routesForDemo } from "router"
import { Carousel, Selector } from "components"
import { useMediaQueries } from "hooks"
import s from "./Nav.module.scss"

interface Props {}

export const Nav: FC<Props> = () => {
  const routes = Object.entries(routesForDemo)
  const { minWidth1024, minWidth768, minWidth667 } = useMediaQueries()
  const amount = minWidth1024 ? 4 : minWidth768 ? 3 : minWidth667 ? 2 : 1

  return (
    <nav className={s.nav}>
      <Selector />
      <Carousel routes={routes} amount={amount} />
    </nav>
  )
}
