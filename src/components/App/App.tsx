import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import style from './App.module.scss';

import Nav from '../Nav';
import header from './header.png';

import { TextQA } from '../skills/en';

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
            <Route path="/en/textqa" exact component={TextQA}/>
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
