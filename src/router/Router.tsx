import {
  TextQA as TextQAru,
  ODQA as ODQAru,
  NER as NERru,
  Sentiment,
} from "../components/skills/ru"
import {
  TextQA as TextQAen,
  ODQA,
  Ranking,
  NER,
  Intent,
  Insult,
} from "../components/skills/en"
import { TextQA as TextQAml, NER as NERml } from "../components/skills/mu"
import { TextQA as TextQAzh } from "../components/skills/zh"
import { Switch, Route } from "react-router-dom"
import React from "react"

export const Router = () => {
  return (
    <Switch>
      <Route path="/ru/textqa" exact component={TextQAru} />
      <Route path="/ru/odqa" exact component={ODQAru} />
      <Route path="/ru/ner" exact component={NERru} />
      <Route path="/ru/sentiment" exact component={Sentiment} />
      <Route path="/en/textqa" exact component={TextQAen} />
      <Route path="/en/odqa" exact component={ODQA} />
      <Route path="/en/ranking" exact component={Ranking} />
      <Route path="/en/ner" exact component={NER} />
      <Route path="/en/intent" exact component={Intent} />
      <Route path="/en/insult" exact component={Insult} />
      <Route path="/mu/textqa" exact component={TextQAml} />
      <Route path="/mu/ner" exact component={NERml} />
      <Route path="/zh/textqa" exact component={TextQAzh} />
    </Switch>
  )
}
