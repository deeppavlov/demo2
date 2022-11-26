import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import style from './App.module.scss';

import Nav from '../Nav';
import Footer from '../Footer';
// mport header from './header.png';
import miptLogoBlue from './mipt-logo-blue.svg';

import { TextQA as TextQAru, ODQA as ODQAru, NER as NERru, Sentiment } from '../skills/ru';
import { TextQA as TextQAen, ODQA, Ranking, NER, Intent, Insult, Chat } from '../skills/en';
import { TextQA as TextQAml, NER as NERml } from '../skills/mu';
import { TextQA as TextQAzh } from '../skills/zh';


class App extends Component {

  render () {
    return (
      <HashRouter>
        <header className={style.header}>
          <p className={style.title}>
            demo.<a href="https://deeppavlov.ai"><span className={style.blue}>DeepPavlov</span>.<span className={style.yellow}>ai</span></a>
          </p>
          <iframe title="stars" src="https://ghbtns.com/github-btn.html?user=deepmipt&repo=DeepPavlov&type=star&count=true&size=large"
           frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
          {/*<img src={header} alt="DeepPavlov Demo"/>*/}
          <img src={miptLogoBlue} alt="MIPT"/>
          <Nav/>
        </header>
        <main className={style.main}>
          <Switch>
            <Route path="/ru/textqa" exact component={TextQAru}/>
            <Route path="/ru/odqa" exact component={ODQAru}/>
            <Route path="/ru/ner" exact component={NERru}/>
            <Route path="/ru/sentiment" exact component={Sentiment}/>
            <Route path="/en/textqa" exact component={TextQAen}/>
            <Route path="/en/odqa" exact component={ODQA}/>
            <Route path="/en/ranking" exact component={Ranking}/>
            <Route path="/en/ner" exact component={NER}/>
            <Route path="/en/chat" exact component={Chat}/>
            <Route path="/en/intent" exact component={Intent}/>
            <Route path="/en/insult" exact component={Insult}/>
            <Route path="/mu/textqa" exact component={TextQAml}/>
            <Route path="/mu/ner" exact component={NERml}/>
            <Route path="/zh/textqa" exact component={TextQAzh}/>
          </Switch>
        </main>
        <Footer/>
      </HashRouter>
    );
  }
}

export default App;
