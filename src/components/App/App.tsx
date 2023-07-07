import React from "react"
import { HashRouter } from "react-router-dom"
import { Router } from "router"
import { Header, Top, Limiter, Footer, Nav } from "components"

export const App = () => (
  <>
    <Header />
    <HashRouter>
      <Top>
        <Nav />
      </Top>
      <Limiter>
        <Router />
      </Limiter>
      <Footer />
    </HashRouter>
  </>
)
