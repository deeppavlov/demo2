import React from "react"

import KnowledgeBaseQA from "pages/QuestionAnswering/KnowledgeBaseQA"
import Emotion from "pages/TextClassification/Emotion"
import Sentiment from "pages/TextClassification/Sentiment"
import Toxic from "pages/TextClassification/Toxic"
import EntityLinking from "pages/TokenClassification/EntityLinking"

import Intent from "pages/TextClassification/Intent"
import NER from "pages/TokenClassification/NER"
import ODQA from "pages/OpenDomainQA/ODQA"

import Topic from "pages/TextClassification/Topic"

import { Switch, Route } from "react-router-dom"
import { Links } from "./Routes"

// prettier-ignore
export const Router = () => (
  <Switch>
    <Route path={`/:tab/${Links.textIntent}`} exact component={Intent} /> {/**/}
    <Route path={`/:tab/${Links.textEmotion}`} exact component={Emotion} />
    <Route path={`/:tab/${Links.textTopic}`} exact component={Topic} /> 
    <Route path={`/:tab/${Links.textToxic}`} exact component={Toxic} /> 
    <Route path={`/:tab/${Links.textSentiment}`} exact component={Sentiment} />
    {/* <Route path={`/:tab/${Links.textFewShot}`} exact component={TextFewShot} /> */}
    
    <Route path={`/:tab/${Links.tokenNer}`} exact component={NER} />  {/**/}
    <Route path={`/:tab/${Links.tokenEntityLinking}`} exact component={EntityLinking} />
    {/* <Route path={`/:tab/${Links.tokenPartOfSpeech}`} exact component={PartOfSpeech} /> */}
    {/* <Route path={`/:tab/${Links.tokenFewShot}`} exact component={TokenFewShot} /> */}
    
    <Route path={`/:tab/${Links.knowledgeQA}`} exact component={KnowledgeBaseQA}/>
    {/* <Route path={`/:tab/${Links.readingComprehesion}`} exact component={ReadingComprehension} /> */}
    
    <Route path={`/:tab/${Links.odqa}`} exact component={ODQA} /> {/**/}
  </Switch>
)
