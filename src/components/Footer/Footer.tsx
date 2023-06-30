import React, { FC, useState, useEffect } from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import TW from "../../assets/tw.svg"
import IN from "../../assets/in.svg"
import { Language } from "components/skills/utils"
import { Buttons } from "components/Buttons/Buttons"
import s from "./Footer.module.scss"
import { Limiter } from "components/Limiter/Limiter"

interface FooterProps extends RouteComponentProps {}

const Footer: FC<FooterProps> = ({ location }) => {
  const [lang, setLang] = useState<Language>("en")

  const socialMediaText =
    lang === "ru" ? "Мы в социальных сетях" : "We are in social media"

  useEffect(() => {
    if (location.pathname === "/") {
      setLang("en")
    } else {
      setLang(location.pathname.split("/")[1] as Language)
    }
  }, [location])

  return (
    <footer className={s.footer}>
      <div className="accentColor">
        <Limiter>
          <div className={s.container}>
            <Buttons />
            <div className={s.social}>
              <p className={s.socialMediaText}>{socialMediaText}</p>
              <div className={s.links}>
                <a href={`/`}>
                  <img src={TW} alt="Twitter" />
                </a>
                <a href={`/`}>
                  <img src={IN} alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </Limiter>
      </div>
    </footer>
  )
}

export default withRouter(Footer)
