import React from "react"
import { HashRouter } from "react-router-dom"
import Nav from "../Nav"
import Footer from "../Footer"
import { Buttons } from "components/Buttons/Buttons"
import { Router } from "router/Router"
import Pavlov from "../../assets/pavlov.svg"
import style from "./App.module.scss"

export const App = () => {
  return (
    <>
      <div className="accentColor sticky ">
        <div className="limiter">
          <div className={style.top}>
            <p className={style.subtitle}>demo.deeppavlov.ai</p>
            <Buttons />
          </div>
        </div>
      </div>
      <HashRouter>
        <div className="accentColor border">
          <div className="limiter">
            <header className={style.header}>
              <div className={style.middle}>
                <div className={style.left}>
                  <p className={style.title}>
                    <a href="https://deeppavlov.ai">
                      <span className={style.blue}>DeepPavlov</span>
                    </a>
                    <span>
                      <span>Demo.</span>
                      <span className={style.yellow}>ai</span>
                    </span>
                  </p>
                  <span className={style.check}>
                    Check and try our products demo with us.
                    <br /> Stay tuned
                  </span>
                </div>
                <div className={style.right}>
                  <img src={Pavlov} alt="" />
                </div>
              </div>
              <Nav />
            </header>
          </div>
        </div>
        <div className="limiter">
          <main className={style.main}>
            <Router />
          </main>
        </div>
        <Footer />
      </HashRouter>
    </>
  )
}
