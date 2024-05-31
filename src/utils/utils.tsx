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
  deepsaffron: "#ff9933",
  amethyst: "#9966cc",
  boysenberry: "#873260",
  brightmaroon: "#c32148"
}

const insultClasses = {
  INSULT: { color: colors.red },
  NOT_INSULT: { color: colors.green },
}
const sentimentClasses = {
  NEGATIVE: { color: colors.red },
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
  "ANIMALS&PETS": { color: colors.blue },
  "ART&HOBBIES": { color: colors.bottlegreen },
  BEAUTY: { color: colors.cobaltblue },
  "BOOKS&LITERATURE": { color: colors.coolblack },
  "CELEBRITIES&EVENTS": { color: colors.cyan },
  CLOTHES: { color: colors.dark },
  DEPRESSION: { color: colors.darktangerine },
  EDUCATION: { color: colors.deepkoamaru },
  "FAMILY&RELATIONSHIPS": { color: colors.green },
  FOOD: { color: colors.grey },
  GADGETS: { color: colors.neoncarrot },
  "HEALTH&MEDICINE": { color: colors.olivedrab },
  JOB: { color: colors.prune },
  LEISURE: { color: colors.quenblue },
  "MOVIES&TV": { color: colors.red },
  MUSIC: { color: colors.smokyblack },
  PERSONALTRANSPORT: { color: colors.yellow },
  RELIGION: { color: colors.vividred },
  SPACE: { color: colors.lightseagreen },
  SPORTS: { color: colors.slateblue },
  TRAVEL: { color: colors.deeppink },
  VIDEOGAMES: { color: colors.blueviolet },
}
const emotionClasses = {
  JOY: { color: colors.yellow },
  SADNESS: { color: colors.bottlegreen },
  ANGER: { color: colors.red },
  SURPRISE: { color: colors.coolblack },
  FEAR: { color: colors.cyan },
}
const newNer = {
  BUSINESS_NAME: {
    color: colors.cobaltblue,
    text: "Companies, agencies, institutions, etc."
  },
  BUSINESS_TYPE: {
    color: colors.deeppink,
    text: "Restaurants, theaters, food courts, bars, etc."
  },
  CARDINAL: {
    color: colors.blueviolet,
    text: "Numerals that do not fall under another type."
  },
  COLOR_TYPE: {
    color: colors.coolblack,
    text: "Red, green, blue, etc."
  },
  DATETIME: {
    color: colors.dark,
    text: "Dates and times."
  },
  DEFINITION_WORD: {
    color: colors.darktangerine,
    text: "The word to which the definition is given in proposed sentence."
  },
  EMAIL_ADDRESS: {
    color: colors.green,
    text: "Email addresses."
  },
  EMAIL_FOLDER: {
    color: colors.slateblue,
    text: "Inbox, spam, drafts, etc."
  },
  EVENT_NAME: {
    color: colors.grey,
    text: "Named hurricanes, battles, wars, sports events, conferences, unnamed events (such as meetings, doctor visits), etc."
  },
  FOOD_TYPE: {
    color: colors.neoncarrot,
    text: "Pizza, wings, eggs, sandwich, etc."
  },
  GAME_NAME: {
    color: colors.olivedrab,
    text: "Video games, card games, etc."
  },
  GENERAL_FREQUENCY: {
    color: colors.darkorange,
    text: "Annual, every day, weekly, etc."
  },
  HOUSE_PLACE: {
    color: colors.prune,
    text: "Places in the house: bathroom, kitchen, etc."
  },
  JOKE_TYPE: {
    color: colors.quenblue,
    text: 'Words related with joke: "funny joke", "joke about cats", etc.'
  },
  LANGUAGE: {
    color: colors.amethyst,
    text: "Any named language."
  },
  LAW: {
    color: colors.deepsaffron,
    text: "Named documents made into laws."
  },
  LIST_NAME: {
    color: colors.red,
    text: "Shopping list, to-do list, etc."
  },
  MEAL_TYPE: {
    color: colors.dodgerblue,
    text: "Dinner, lunch, breakfast, etc."
  },
  MEDIA_TYPE: {
    color: colors.smokyblack,
    text: "Names of news and media agencies, and media related words (tweet, audiobook, website, etc.)."
  },
  MONEY: {
    color: colors.cyan,
    text: "Monetary values, including unit."
  },
  MUSIC_GENRE: {
    color: colors.vividred,
    text: "Names of music genres."
  },
  NORP: {
    color: colors.bottlegreen,
    text: "Nationalities or religious or political groups."
  },
  ORDER_TYPE: {
    color: colors.yellow,
    text: "Delivery, take-out, takeaway, etc."
  },
  ORDINAL: {
    color: colors.blue,
    text: "First, second, etc."
  },
  PERCENT: {
    color: colors.coolblack,
    text: 'Percentage, including "%".'
  },
  PERSON: {
    color: colors.lightseagreen,
    text: "People, including fictional."
  },
  PERSONAL_INFO: {
    color: colors.boysenberry,
    text: 'Words representing personal information: "email", "phone number", etc.'
  },
  PLACE_NAME: {
    color: colors.slateblue,
    text: "Countries, cities, mountain ranges, bodies of water, airports, bridges, hughways, etc."
  },
  PRODUCT: {
    color: colors.neoncarrot,
    text: "Objects, vehicles, etc. (not services).",
  },
  QUANTITY: {
    color: colors.darkslategray,
    text: "Measurements, as of weight or distance."
  },
  RADIO_NAME: {
    color: colors.grey,
    text: "Names of radio stations."
  },
  RELATION: {
    color: colors.deeppink,
    text: "Everything that represents relations: mother, colleague, 11-year old son, etc."
  },
  TIMEOFDAY: {
    color: colors.dodgerblue,
    text: "Morning, night, etc."
  },
  TRANSPORT_AGENCY: {
    color: colors.brightmaroon,
    text: "Names of taxi agencies."
  },
  TRANSPORT_TYPE: {
    color: colors.dimgray,
    text: "Train, taxi, metro, etc."
  },
  WEATHER_DESCRIPTOR: {
    color: colors.burlywood,
    text: "Weather types (cold, sunny, windy, etc.) and clothes (umbrella, raincoat, etc.)."
  },
  WORK_OF_ART: {
    color: colors.cyan,
    text: "Titles of books, songs, paintings, etc."
  }
}
const newIntent = {
  ALARM: { color: colors.blue, text: "ALARM_QUERY, ALARM_REMOVE, ALARM_SET" },
  AUDIO: {
    color: colors.bottlegreen,
    text: "AUDIO_VOLUME_DOWN, AUDIO_VOLUME_MUTE, AUDIO_VOLUME_OTHER, AUDIO_VOLUME_UP",
  },
  CALENDAR: {
    color: colors.cobaltblue,
    text: "CALENDAR_QUERY, CALENDAR_REMOVE, CALENDAR_SET",
  },
  COOKING: { color: colors.coolblack, text: "COOKING_QUERY, COOKING_RECIPE" },
  DATETIME: { color: colors.cyan, text: "DATETIME_CONVERT, DATETIME_QUERY" },
  EMAIL: {
    color: colors.dark,
    text: "EMAIL_ADDCONTACT, EMAIL_QUERY, EMAIL_QUERYCONTACT, EMAIL_SENDEMAIL",
  },
  GENERAL: {
    color: colors.darktangerine,
    text: "GENERAL_GREET, GENERAL_JOKE, GENERAL_QUIRKY",
  },
  IOT: {
    color: colors.deepkoamaru,
    text: "IOT_CLEANING, IOT_COFFEE, IOT_HUE_LIGHTCHANGE, IOT_HUE_LIGHTDIM, IOT_HUE_LIGHTOFF, IOT_HUE_LIGHTON, IOT_HUE_LIGHTUP, IOT_WEMO_OFF, IOT_WEMO_ON",
  },
  LISTS: {
    color: colors.green,
    text: "LISTS_CREATEORADD, LISTS_QUERY, LISTS_REMOVE",
  },
  MUSIC: {
    color: colors.grey,
    text: "MUSIC_DISLIKENESS, MUSIC_LIKENESS, MUSIC_QUERY, MUSIC_SETTINGS",
  },
  NEWS: {
    color: colors.neoncarrot,
    text: "NEWS_QUERY",
  },
  PLAY: {
    color: colors.olivedrab,
    text: "PLAY_AUDIOBOOK, PLAY_GAME, PLAY_MUSIC, PLAY_PODCASTS, PLAY_RADIO",
  },
  QA: {
    color: colors.prune,
    text: "QA_CURRENCY, QA_DEFINITION, QA_FACTOID, QA_MATHS, QA_STOCK",
  },
  RECOMMENDATION: {
    color: colors.quenblue,
    text: "RECOMMENDATION_EVENTS, RECOMMENDATION_LOCATIONS, RECOMMENDATION_MOVIES",
  },
  SOCIAL: {
    color: colors.red,
    text: "SOCIAL_POST, SOCIAL_QUERY",
  },
  TAKEAWAY: {
    color: colors.smokyblack,
    text: "TAKEAWAY_ORDER, TAKEAWAY_QUERY",
  },
  TRANSPORT: { color: colors.vividred, text: "TRANSPORT_QUERY, TRANSPORT_TAXI, TRANSPORT_TICKET, TRANSPORT_TRAFFIC" },
  WEATHER: { color: colors.yellow, text: "WEATHER_QUERY" },
}
export type Classes = {
  [key: string]: { color: string; text?: string; hidden?: boolean }
}

const renderNerClasses = (classes: Classes, disableTip: boolean) => {
  return (
    classes &&
    Object.entries(classes).map(([key, value], i) => {
      return (
        <NerClass
          label={key}
          {...value}
          key={i}
          hidden={value.hidden}
          disableTip={disableTip}
        />
      )
    })
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
  hidden?: boolean
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
    const { label, color, text, tip, disableTip, hidden } = this.props
    const { clicked, leftTooltip } = this.state

    return (
      <span
        className="card margin_r"
        style={{
          backgroundColor: color,
          cursor: text ? "help" : "default",
          display: hidden ? "none" : "inlineblock",
        }}
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
