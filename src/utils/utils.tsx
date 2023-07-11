import React, { Component, createRef } from "react"
import cn from "classnames"

// colors from new design in comments
const colors = {
  red: "#dc3545", // NORP #FF3333
  blue: "#0069b4", // PERSON/ASK #3300FF
  cyan: "#17a2b8", // ORG #3399CC
  green: "#28a745", // LOC #00CC99
  yellow: "#ffc107", // GPE #FFCC00
  dark: "#47525C", //  DATE #FF3333
  grey: "#6c757d", // MONEY #47525C
  prune: "#721817", // FAC rgba(71, 82, 92, 0.6);
  neoncarrot: "#fa9f42", // PRODUCT #FF9500
  deepkoamaru: "#2b4162", // EVENT #7000FF
  bottlegreen: "#0b6e4f", // WORK_OF_ART #FF3333
  coolblack: "#C880B7", // LAW #CC66CC
  quenblue: "#437f97", // LANGUAGE #3A86FF
  olivedrab: "#849324", // TIME #07DA35
  darktangerine: "#F1D302", // PERCENT  #FFBE0B
  vividred: "#fd151b", // QUANTITY #FF70AE
  cobaltblue: "#004BA8", // ORDINAL #4125D0
  smokyblack: "#235789", // CARDINAL #3A86FF
  lightseagreen: "#20C997",
  slateblue: "#6F42C1",
  deeppink: "#E83E8C",
  blueviolet: "#6610F2",
  dodgerblue: "#007BFF",
  darkorange: "#FD7E14",
  darkslategray: "#385F71",
  burlywood: "#D7B377",
  dimgray: "#8F754F",
}

const insultClasses = {
  INSULT: { color: colors.red },
  NOT_INSULT: { color: colors.green },
}
const sentimentClasses = {
  NEGATIVE: { color: colors.cobaltblue },
  POSITIVE: { color: colors.bottlegreen },
  NEUTRAL: { color: colors.cyan },
}
const ontonotesClasses = {
  PERSON: { color: colors.blue, text: "People, including fictional." },
  NORP: {
    color: colors.red,
    text: "Nationalities or religious or political groups.",
  },
  ORG: { color: colors.cyan, text: "Companies, agencies, institutions, etc." },
  LOC: {
    color: colors.green,
    text: "Non-GPE locations, mountain ranges, bodies of water.",
  },
  GPE: { color: colors.yellow, text: "Countries, cities, states." },
  DATE: { color: colors.dark, text: "Absolute or relative dates or periods." },
  MONEY: { color: colors.grey, text: "Monetary values, including unit." },
  FAC: {
    color: colors.prune,
    text: "Buildings, airports, highways, bridges, etc.",
  },
  PRODUCT: {
    color: colors.neoncarrot,
    text: "Objects, vehicles, foods, etc. (Not services.)",
  },
  EVENT: {
    color: colors.deepkoamaru,
    text: "Named hurricanes, battles, wars, sports events, etc.",
  },
  WORK_OF_ART: {
    color: colors.bottlegreen,
    text: "Titles of books, songs, etc.",
  },
  LAW: { color: colors.coolblack, text: "Named documents made into laws." },
  LANGUAGE: { color: colors.quenblue, text: "Any named language." },
  TIME: { color: colors.olivedrab, text: "Times smaller than a day." },
  PERCENT: { color: colors.darktangerine, text: 'Percentage, including "%".' },
  QUANTITY: {
    color: colors.vividred,
    text: "Measurements, as of weight or distance.",
  },
  ORDINAL: { color: colors.cobaltblue, text: '"first", "second", etc.' },
  CARDINAL: {
    color: colors.smokyblack,
    text: "Numerals that do not fall under another type.",
  },
}
//
const topicClasses = {
  "Animals&Pets": { color: colors.blue },
  "Art&Hobbies": { color: colors.bottlegreen },
  Beauty: { color: colors.cobaltblue },
  "Books&Literature": { color: colors.coolblack },
  "Celebrities&Events": { color: colors.cyan },
  Clothes: { color: colors.dark },
  Depression: { color: colors.darktangerine },
  Education: { color: colors.deepkoamaru },
  "Family&Relationships": { color: colors.green },
  Food: { color: colors.grey },
  Gadgets: { color: colors.neoncarrot },
  "Health&Medicine": { color: colors.olivedrab },
  Job: { color: colors.prune },
  Leisure: { color: colors.quenblue },
  "Movies&Tv": { color: colors.red },
  Music: { color: colors.smokyblack },
  PersonalTransport: { color: colors.yellow },
  Religion: { color: colors.vividred },
  Space: { color: colors.lightseagreen },
  Sports: { color: colors.slateblue },
  Travel: { color: colors.deeppink },
  Videogames: { color: colors.blueviolet },
}
const emotionClasses = {
  JOY: { color: colors.blue },
  SADNESS: { color: colors.bottlegreen },
  ANGER: { color: colors.cobaltblue },
  SURPRISE: { color: colors.coolblack },
  FEAR: { color: colors.cyan },
}
const newNer = {
  ARTIST_NAME: { color: colors.blue },
  AUDIOBOOK_NAME: { color: colors.bottlegreen },
  BUSINESS_NAME: { color: colors.cobaltblue },
  COLOR_TYPE: { color: colors.coolblack },
  CURRENCY_NAME: { color: colors.cyan },
  DATE: { color: colors.dark },
  DEFINITION_WORD: { color: colors.darktangerine },
  DEVICE_TYPE: { color: colors.deepkoamaru },
  EMAIL_ADDRESS: { color: colors.green },
  EMAIL_FOLDER: { color: colors.slateblue },
  EVENT_NAME: { color: colors.grey },
  FOOD_TYPE: { color: colors.neoncarrot },
  MEAL_TYPE: { color: colors.dodgerblue },
  GAME_NAME: { color: colors.olivedrab },
  HOUSE_PLACE: { color: colors.prune },
  JOKE_TYPE: { color: colors.quenblue },
  LIST_NAME: { color: colors.red },
  MEDIA_TYPE: { color: colors.smokyblack },
  MUSIC_GENRE: { color: colors.vividred },
  ORDER_TYPE: { color: colors.yellow },
  PERSON: { color: colors.lightseagreen },
  PLACE_NAME: { color: colors.slateblue },
  RELATION: { color: colors.deeppink },
  TIME: { color: colors.blueviolet },
  TIMEOFDAY: { color: colors.dodgerblue },
  TIME_ZONE: { color: colors.darkorange },
  TRANSPORT_AGENCY: { color: colors.dimgray },
  TRANSPORT_TYPE: { color: colors.darkslategray },
  WEATHER_DESCRIPTOR: { color: colors.burlywood },
}
const newIntent = {
  ALARM: { color: colors.blue },
  AUDIO: { color: colors.bottlegreen },
  CALENDAR: { color: colors.cobaltblue },
  COOKING: { color: colors.coolblack },
  DATETIME: { color: colors.cyan },
  EMAIL: { color: colors.dark },
  GENERAL: { color: colors.darktangerine },
  IOT: { color: colors.deepkoamaru },
  LISTS: { color: colors.green },
  MUSIC: { color: colors.grey },
  NEWS: { color: colors.neoncarrot },
  PLAY: { color: colors.olivedrab },
  QA: { color: colors.prune },
  RECOMMENDATION: { color: colors.quenblue },
  SOCIAL: { color: colors.red },
  TAKEAWAY: { color: colors.smokyblack },
  TRANSPORT: { color: colors.vividred },
  WEATHER: { color: colors.yellow },
}
export type Classes = { [key: string]: { color: string; text?: string } }

const renderNerClasses = (classes: Classes, disableTip: boolean) => {
  return (
    classes &&
    Object.entries(classes).map(
      ([key, value]: [string, { color: string; text?: string }], i: number) => (
        <NerClass label={key} {...value} key={i} disableTip={disableTip} />
      )
    )
  )
}

export {
  renderNerClasses,
  ontonotesClasses,
  insultClasses,
  sentimentClasses,
  topicClasses,
  emotionClasses,
  newNer,
  newIntent,
}
export type Language = "ru" | "en" | "mu"
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
      leftTooltip: "",
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
    if (this.tooltipRef.current) {
      if (this.tooltipRef.current.getClientRects()[0].left < 140) {
        this.setState({ leftTooltip: "leftTooltip" })
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }
  handleClickOutside = (event: any) => {
    if (this.ref && !this.ref.current!.contains(event.target)) {
      this.setState({ clicked: false })
    }
  }

  render() {
    const { label, color, text, tip, disableTip } = this.props
    const { clicked, leftTooltip } = this.state
    // console.log("label,color,text,tip = ", label, color, text, tip)
    return (
      <span
        className="card margin_r"
        style={{ backgroundColor: color, cursor: text ? "help" : "inherit" }}
        onClick={() => this.setState({ clicked: !clicked })}
        ref={this.ref}
      >
        {`${label}`}
        {tip && !disableTip && <span className="innerTip">{tip}</span>}
        {text && (
          <div
            className={cn(
              "tooltip",
              leftTooltip,
              clicked ? "activeTooltip" : ""
            )}
            ref={this.tooltipRef}
          >
            <div className="tooltipInner" style={{ backgroundColor: color }}>
              {text}
            </div>
          </div>
        )}
      </span>
    )
  }
}
