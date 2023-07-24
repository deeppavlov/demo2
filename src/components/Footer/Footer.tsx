import React, { FC } from "react"
import TW from "assets/icons/tw.svg"
import IN from "assets/icons/in.svg"
import { Buttons, CustomLink, Limiter } from "components"
import s from "./Footer.module.scss"

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className={s.footer}>
      <div className="accentColor">
        <Limiter>
          <div className={s.container}>
            <Buttons />
            <div className={s.social}>
            {/* <p className={s.socialMediaText}>We are in social media</p>
              <div className={s.links}>
                <CustomLink href={`/`}>
                  <img src={TW} alt="Twitter" />
                </CustomLink>
                <CustomLink href={`/`}>
                  <img src={IN} alt="LinkedIn" />
                </CustomLink>
              </div>*/}
            </div>
          </div>
        </Limiter>
      </div>
    </footer>
  )
}
