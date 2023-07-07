import React, { FC } from "react"
import { routesForDemo } from "router"
import { Carousel, Selector } from "components"
import s from "./Nav.module.scss"

interface Props {}

export const Nav: FC<Props> = () => {
  const routes = Object.entries(routesForDemo)

  return (
    <>
      <nav className={s.nav}>
        <Selector />
        <Carousel routes={routes} amount={4} />
      </nav>
    </>
  )
}
