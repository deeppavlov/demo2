import React from "react"
import { HashRouter } from "react-router-dom"
import { Header } from "components/Header/Header"
import { Top } from "components/Top/Top"
import { Limiter } from "components/Limiter/Limiter"
import Nav from "../Nav"
import Footer from "../Footer"
import { Router } from "router/Router"

export const App = () => (
  <>
    <Header />
    <HashRouter>
      <Top>
        <Nav />
      </Top>
      <Limiter>{/* <Router /> */}</Limiter>
      <Footer />
    </HashRouter>
  </>
)
