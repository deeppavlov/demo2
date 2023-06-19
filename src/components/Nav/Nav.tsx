import React, { FC, useState, useEffect } from "react"
import cn from "classnames"
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom"
import s from "./Nav.module.scss"
import { Language } from "components/skills/utils"
import { ROUTES } from "router/Routes"

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

    let newRoute = ROUTES[newLang][0].link
    if (component[newLang]) {
      newRoute = component[newLang]
    }
    history.push(`/${newLang}/${newRoute}`)
    setLang(newLang)
  }

  const renderNavLinks = (lang: Language) => {
    const links = ROUTES[lang]
    return links.map((item, index: number) => {
      return (
        <li key={index}>
          <NavLink
            key={index}
            to={`/${lang}/${item.link}`}
            exact
            activeClassName={s.activeLink}
            className={s.navLink}
          >
            <div className={s.linkContainer}>{item.title}</div>
          </NavLink>
        </li>
      )
    })
  }

  const isEn = lang === Lang.en
  const isRu = lang === Lang.ru
  const isMu = lang === Lang.mu

  return (
    <>
      <div className={s.container}>
        <span className={s.annotation}>Choose language for your model</span>
        <div className={s.langSelector}>
          <div
            className={cn(isRu && s.active)}
            onClick={() => langChange(Lang.ru)}
          >
            Ru
          </div>
          <div
            className={cn(isEn && s.active)}
            onClick={() => langChange(Lang.en)}
          >
            En
          </div>

          <div
            className={cn(isMu && s.active)}
            onClick={() => langChange(Lang.mu)}
          >
            Multi-Lang
          </div>
        </div>
      </div>
      <nav className={s.nav}>
        <ul className={cn(s.navLinks, isMu && s.multiLangFlex)}>
          {renderNavLinks(lang)}
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Nav)
