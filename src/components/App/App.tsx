import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import style from './App.module.scss';

import Nav from '../Nav';
import Footer from '../Footer';
import header from './header.png';

import { TextQA as TextQAen, ODQA } from '../skills/en';
import { TextQA as TextQAml, NER as NERml } from '../skills/mu';

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <header className={style.header}>
          <img src={header} alt="DeepPavlov Demo"/>
          <Nav/>
        </header>
        <main className={style.main}>
          <Switch>
            <Route path="/en/textqa" exact component={TextQAen}/>
            <Route path="/en/odqa" exact component={ODQA}/>
            <Route path="/mu/textqa" exact component={TextQAml}/>
            <Route path="/mu/ner" exact component={NERml}/>
          </Switch>
        </main>
        <Footer/>
      </BrowserRouter>
    );
  }
}

export default App;
