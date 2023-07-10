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
}

const ruNerStyles = {
  ORG: { color: colors.red, text: "Companies, agencies, institutions, etc." },
  LOC: {
    color: colors.yellow,
    text: "Non-GPE locations, mountain ranges, bodies of water.",
  },
  PER: { color: colors.green, text: "People, including fictional." },
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

const insultClasses = {
  Insult: { color: colors.red },
  "Not Insult": { color: colors.green },
}
const sentimentClasses = {
  negative: { color: colors.cobaltblue },
  positive: { color: colors.bottlegreen },
  neutral: { color: colors.cyan },
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
  Space: { color: colors.blue },
  Sports: { color: colors.blue },
  Travel: { color: colors.blue },
  Videogames: { color: colors.blue },
}
const emotionClasses = {
  Joy: { color: colors.blue },
  Sadness: { color: colors.bottlegreen },
  Anger: { color: colors.cobaltblue },
  Surprise: { color: colors.coolblack },
  Fear: { color: colors.cyan },
}
const newNer = {
  Artist: { color: colors.blue },
  Audiobook: { color: colors.bottlegreen },
  Business: { color: colors.cobaltblue },
  Color: { color: colors.coolblack },
  Currency: { color: colors.cyan },
  Date: { color: colors.dark },
  Definition: { color: colors.darktangerine },
  Device: { color: colors.deepkoamaru },
  Email: { color: colors.green },
  Event: { color: colors.grey },
  Food: { color: colors.neoncarrot },
  Game: { color: colors.olivedrab },
  House: { color: colors.prune },
  Joke: { color: colors.quenblue },
  List: { color: colors.red },
  Media: { color: colors.smokyblack },
  Music: { color: colors.vividred },
  Order: { color: colors.yellow },
  Person: { color: colors.blue },
  Place: { color: colors.bottlegreen },
  Relation: { color: colors.cobaltblue },
  Time: { color: colors.coolblack },
  Transport: { color: colors.cyan },
  Weather: { color: colors.dark },
}
// `Artist: Artist_name
// Audiobook: Audiobook_name
// Business: Business_name, Business_type
// Color: Color_type
// Currency: Currency_name
// Date: Date
// Definition: Definition_word
// Device: Device_type
// Email: Email_address, Email_folder
// Event: Event_name
// Food: Food_type, Meal_type
// Game: Game_name
// House: House_place
// Joke: Joke_type
// List: List_name
// Media: Media_type
// Music: Music_genre
// Order: Order_type
// Person: Person
// Place: Place_name
// Relation: Relation
// Time: Time, Timeofday, Time_zone
// Transport: Transport_agency, Transport_type
// Weather: Weather_descriptor`
const newIntent = {
  Alarm: { color: colors.blue },
  Audio: { color: colors.bottlegreen },
  Calendar: { color: colors.cobaltblue },
  Cooking: { color: colors.coolblack },
  Datetime: { color: colors.cyan },
  Emai: { color: colors.dark },
  General: { color: colors.darktangerine },
  IoT: { color: colors.deepkoamaru },
  Lists: { color: colors.green },
  Music: { color: colors.grey },
  News: { color: colors.neoncarrot },
  Play: { color: colors.olivedrab },
  QA: { color: colors.prune },
  Recommendation: { color: colors.quenblue },
  Social: { color: colors.red },
  Takeaway: { color: colors.smokyblack },
  Transport: { color: colors.vividred },
  Weather: { color: colors.yellow },
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
  ruNerStyles,
  intentsClasses,
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
