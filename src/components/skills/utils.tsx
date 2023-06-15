/** @format */

import React, { Component, createRef } from 'react'
import cn from 'classnames'
// you can see colors from new design in comments
const colors = {
	red: '#dc3545', // NORP #FF3333
	blue: '#0069b4', // PERSON/ASK #3300FF
	cyan: '#17a2b8', // ORG #3399CC
	green: '#28a745', // LOC #00CC99
	yellow: '#ffc107', // GPE #FFCC00
	dark: '#47525C', //  DATE #FF3333
	grey: '#6c757d', // MONEY #47525C
	prune: '#721817', // FAC rgba(71, 82, 92, 0.6);
	neoncarrot: '#fa9f42', // PRODUCT #FF9500
	deepkoamaru: '#2b4162', // EVENT #7000FF
	bottlegreen: '#0b6e4f', // WORK_OF_ART #FF3333
	coolblack: '#C880B7', // LAW #CC66CC
	quenblue: '#437f97', // LANGUAGE #3A86FF
	olivedrab: '#849324', // TIME #07DA35
	darktangerine: '#F1D302', // PERCENT  #FFBE0B
	vividred: '#fd151b', // QUANTITY #FF70AE
	cobaltblue: '#004BA8', // ORDINAL #4125D0
	smokyblack: '#235789', // CARDINAL #3A86FF
}

const ruNerStyles = {
	ORG: { color: colors.red, text: 'Companies, agencies, institutions, etc.' },
	LOC: {
		color: colors.yellow,
		text: 'Non-GPE locations, mountain ranges, bodies of water.',
	},
	PER: { color: colors.green, text: 'People, including fictional.' },
}

const intentsClasses = {
	AddToPlaylist: { color: colors.blue },
	BookRestaurant: { color: colors.grey },
	GetWeather: { color: colors.green },
	PlayMusic: { color: colors.red },
	RateBook: { color: colors.yellow },
	SearchCreativeWork: { color: colors.cyan },
	SearchScreeningEvent: { color: colors.dark },
}

const ontonotesClasses = {
	PERSON: { color: colors.blue, text: 'People, including fictional.' },
	NORP: {
		color: colors.red,
		text: 'Nationalities or religious or political groups.',
	},
	ORG: { color: colors.cyan, text: 'Companies, agencies, institutions, etc.' },
	LOC: {
		color: colors.green,
		text: 'Non-GPE locations, mountain ranges, bodies of water.',
	},
	GPE: { color: colors.yellow, text: 'Countries, cities, states.' },
	DATE: { color: colors.dark, text: 'Absolute or relative dates or periods.' },
	MONEY: { color: colors.grey, text: 'Monetary values, including unit.' },
	FAC: {
		color: colors.prune,
		text: 'Buildings, airports, highways, bridges, etc.',
	},
	PRODUCT: {
		color: colors.neoncarrot,
		text: 'Objects, vehicles, foods, etc. (Not services.)',
	},
	EVENT: {
		color: colors.deepkoamaru,
		text: 'Named hurricanes, battles, wars, sports events, etc.',
	},
	WORK_OF_ART: {
		color: colors.bottlegreen,
		text: 'Titles of books, songs, etc.',
	},
	LAW: { color: colors.coolblack, text: 'Named documents made into laws.' },
	LANGUAGE: { color: colors.quenblue, text: 'Any named language.' },
	TIME: { color: colors.olivedrab, text: 'Times smaller than a day.' },
	PERCENT: { color: colors.darktangerine, text: 'Percentage, including "%".' },
	QUANTITY: {
		color: colors.vividred,
		text: 'Measurements, as of weight or distance.',
	},
	ORDINAL: { color: colors.cobaltblue, text: '"first", "second", etc.' },
	CARDINAL: {
		color: colors.smokyblack,
		text: 'Numerals that do not fall under another type.',
	},
}

const renderNerClasses = (
	classes: {
		[key: string]: { color: string; text?: string }
	},
	disableTip: boolean
) => {
	return Object.entries(classes).map(
		([key, value]: [string, { color: string; text?: string }], i: number) => (
			<NerClass label={key} {...value} key={i} disableTip={disableTip} />
		)
	)
}
export { renderNerClasses, ontonotesClasses, ruNerStyles, intentsClasses }

export type Language = 'ru' | 'en' | 'mu' | 'zh'

interface NerClassProps {
	label: string
	color: string
	text?: string
	tip?: string
	disableTip?: boolean
}
interface NerClassState {
	clicked: boolean
	leftTooltip: string
}
export class NerClass extends Component<NerClassProps, NerClassState> {
	ref: React.RefObject<HTMLSpanElement>
	tooltipRef: React.RefObject<HTMLDivElement>

	constructor(props: NerClassProps) {
		super(props)
		this.ref = createRef()
		this.tooltipRef = createRef()
		this.state = {
			clicked: false,
			leftTooltip: '',
		}
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside)
		if (this.tooltipRef.current) {
			if (this.tooltipRef.current.getClientRects()[0].left < 140) {
				this.setState({ leftTooltip: 'leftTooltip' })
			}
		}
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside)
	}
	handleClickOutside = (event: any) => {
		if (this.ref && !this.ref.current!.contains(event.target)) {
			this.setState({ clicked: false })
		}
	}

	render() {
		const { label, color, text, tip, disableTip } = this.props
		const { clicked, leftTooltip } = this.state
		return (
			<span
				className='card margin_r'
				style={{ backgroundColor: color, cursor: text ? 'help' : 'inherit' }}
				onClick={() => this.setState({ clicked: !clicked })}
				ref={this.ref}>
				{`${label}`}
				{tip && !disableTip && <span className='innerTip'>{tip}</span>}
				{text && (
					<div
						className={cn(
							'tooltip',
							leftTooltip,
							clicked ? 'activeTooltip' : ''
						)}
						ref={this.tooltipRef}>
						<div className='tooltipInner' style={{ backgroundColor: color }}>
							{text}
						</div>
					</div>
				)}
			</span>
		)
	}
}
