import React, { FC, useState, useEffect } from "react"
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom"
import { Language } from "components/skills/utils"
import { ROUTES } from "router/Routes"
import { routesBtns, routesForDemo } from "constants/constants"
import { Carousel } from "components/Carousel/Carousel"
import s from "./Nav.module.scss"

interface Props extends RouteComponentProps {}

interface ComponentState {
  ru: string
  en: string
  mu: string
}

enum Lang {
  en = "en",
  ru = "ru",
  mu = "mu",
}

const Nav: FC<Props> = ({ location, history }) => {
  const [lang, setLang] = useState<Language>(Lang.en)
  const [component, setComponent] = useState<ComponentState>({
    ru: "",
    en: "",
    mu: "",
  })

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      history.push(`/${Lang.en}/${ROUTES.en[0].link}`)
      setLang(Lang.en)
      setComponent((prevComponent) => ({
        ...prevComponent,
        en: ROUTES.en[0].link,
      }))
    } else {
      setLang(location.pathname.split("/")[1] as Language)
      setComponent((prevComponent) => ({
        ...prevComponent,
        [location.pathname.split("/")[1]]: location.pathname.split("/")[2],
      }))
    }
  }, [location, history])

  const langChange = (newLang: Language) => {
    if (newLang === lang) return

    let newRoute: any = ROUTES[newLang][0].link
    if (component[newLang]) {
      newRoute = component[newLang]
    }
    history.push(`/${newLang}/${newRoute}`)
    setLang(newLang)
  }

  const links = ROUTES[lang]
  console.log("links = ", links)
  console.log("routesForBtns = ", routesForDemo)

  return (
    <nav className={s.nav}>
      <Carousel buttons={routesBtns} amount={4}></Carousel>
    </nav>
  )
}

export default withRouter(Nav)
