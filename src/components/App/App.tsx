import React from "react"
import { HashRouter } from "react-router-dom"
import { Router } from "router"
import { Header, Top, Limiter, Footer, Nav } from "components"

export const App = () => (
  <>
    <Header />
    {React.createElement(HashRouter as any, {},
      <>
        <Top>
          <Nav />
        </Top>
        <Limiter>
          <Router />
        </Limiter>
        <Footer />
      </>
    )}
  </>
)
