/** @format */

import React, { Component } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import style from './App.module.scss'

import Nav from '../Nav'
import Footer from '../Footer'

import Pavlov from './pavlov.svg'

import {
	TextQA as TextQAru,
	ODQA as ODQAru,
	NER as NERru,
	Sentiment,
} from '../skills/ru'
import {
	TextQA as TextQAen,
	ODQA,
	Ranking,
	NER,
	Intent,
	Insult,
	Chat,
} from '../skills/en'
import { TextQA as TextQAml, NER as NERml } from '../skills/mu'
import { TextQA as TextQAzh } from '../skills/zh'
import Buttons from 'components/Buttons/Buttons'

class App extends Component {
	render() {
		return (
			<>
				<div className='accentColor sticky '>
					<div className='limiter'>
						<div className={style.top}>
							<p className={style.subtitle}>demo.deeppavlov.ai</p>
							<Buttons />
						</div>
					</div>
				</div>
				<HashRouter>
					<div className='accentColor border'>
						<div className='limiter'>
							<header className={style.header}>
								<div className={style.middle}>
									<div className={style.left}>
										<p className={style.title}>
											<a href='https://deeppavlov.ai'>
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
										<img src={Pavlov} alt='' />
									</div>
								</div>
								{/*<img src={header} alt="DeepPavlov Demo"/>*/}
								<Nav />
							</header>
						</div>
					</div>
					<div className='limiter'>
						<main className={style.main}>
							<Switch>
								<Route path='/ru/textqa' exact component={TextQAru} />
								<Route path='/ru/odqa' exact component={ODQAru} />
								<Route path='/ru/ner' exact component={NERru} />
								<Route path='/ru/sentiment' exact component={Sentiment} />
								<Route path='/en/textqa' exact component={TextQAen} />
								<Route path='/en/odqa' exact component={ODQA} />
								<Route path='/en/ranking' exact component={Ranking} />
								<Route path='/en/ner' exact component={NER} />
								{/* <Route path='/en/chat' exact component={Chat} /> */}
								<Route path='/en/intent' exact component={Intent} />
								<Route path='/en/insult' exact component={Insult} />
								<Route path='/mu/textqa' exact component={TextQAml} />
								<Route path='/mu/ner' exact component={NERml} />
								<Route path='/zh/textqa' exact component={TextQAzh} />
							</Switch>
						</main>
					</div>
					<Footer />
				</HashRouter>
			</>
		)
	}
}

export default App
