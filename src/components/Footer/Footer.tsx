/** @format */

import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import style from './Footer.module.scss'

import FB from './fb.svg'
import TW from './tw.svg'
import IN from './in.svg'

import { Language } from 'components/skills/utils'
import Buttons from 'components/Buttons/Buttons'

type Props = RouteComponentProps

interface State {
	lang: Language
}

class Nav extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			lang: 'en',
		}
	}
	componentDidMount() {
		const {
			location: { pathname },
		} = this.props
		if (pathname === '/') {
			this.setState({ lang: 'en' })
		} else {
			this.setState({ lang: pathname.split('/')[1] as Language })
		}
	}
	static getDerivedStateFromProps(props: Props) {
		const {
			location: { pathname },
		} = props
		return { lang: pathname.split('/')[1] as Language }
	}

	render() {
		return (
			<footer className={style.footer}>
				<div className='accentColor'>
					<div className={'limiter'}>
						<div className={style.container}>
							<Buttons />
							<div className={style.social}>
								<p className={style.socialMediaText}>We are in social media</p>
								<div className={style.links}>
									<a href='http://localhost:3000/#/en/ner'>
										<img src={TW} alt='Twitter' />
									</a>

									<a href='http://localhost:3000/#/en/ner'>
										<img src={IN} alt='LinkedIn' />
									</a>

									<a href='http://localhost:3000/#/en/ner'>
										<img src={FB} alt='Facebook' />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={style.gradientContainer}>
					<div className={'limiter'}>
						<div className={style.subscribe}>
							<p>Subscribe for our news, stay updated with us!</p>
							<input type='text' placeholder='Write your e-mail' />
						</div>
					</div>
				</div>
				{false && (
					<div className={style.saas}>
						<p>Docker</p>
						<a
							href='http://docs.deeppavlov.ai/en/master/intro/quick_start.html#docker-images'
							rel='noopener noreferrer'
							target='_blank'>
							DeepPavlov Docker images reference
						</a>
					</div>
				)}
				<div className='limiter'>
					<div className={style.deepMiptContainer}>
						<a className={style.link} href='https://github.com/deepmipt'>
							© deepmipt on GitHub
						</a>
						<p className={style.privatePolicy}>Private Policy</p>
					</div>
				</div>
			</footer>
		)
	}
}

export default withRouter(Nav)
