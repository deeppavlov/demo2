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
  ARTIST_NAME: {
    color: colors.blue,
    // text: "Artist_name"
  },
  AUDIOBOOK_NAME: {
    color: colors.bottlegreen,
    // text: "Audiobook_name",
  },
  BUSINESS_NAME: {
    color: colors.cobaltblue,
    // text: "Business_name, Business_type",
  },
  BUSINESS_TYPE: {
    color: colors.deeppink,
    text: "",
    // hidden: true
  },
  COLOR_TYPE: {
    color: colors.coolblack,
    // text: "Color_type"
  },
  CURRENCY_NAME: {
    color: colors.cyan,
    // text: "Currency_name"
  },
  DATE: {
    color: colors.dark,
    // text: "Date"
  },
  DEFINITION_WORD: {
    color: colors.darktangerine,
    // text: "Definition_word"
  },
  DEVICE_TYPE: {
    color: colors.deepkoamaru,
    // text: "Device_type"
  },
  EMAIL_ADDRESS: {
    color: colors.green,
    // text: "Email_address, Email_folder"
  },
  EMAIL_FOLDER: {
    color: colors.slateblue,
    text: "",
    // hidden: true
  },
  EVENT_NAME: {
    color: colors.grey,
    // text: "Event_name"
  },
  FOOD_TYPE: {
    color: colors.neoncarrot,
    // text: "Food_type, Meal_type"
  },
  MEAL_TYPE: {
    color: colors.dodgerblue,
    text: "",
    // hidden: true
  },
  GAME_NAME: {
    color: colors.olivedrab,
    // text: " Game_name"
  },
  HOUSE_PLACE: {
    color: colors.prune,
    // text: "House_place"
  },
  JOKE_TYPE: {
    color: colors.quenblue,
    // text: "Joke_type"
  },
  LIST_NAME: {
    color: colors.red,
    // text: "List_name"
  },
  MEDIA_TYPE: {
    color: colors.smokyblack,
    // text: "Media_type"
  },
  MUSIC_GENRE: {
    color: colors.vividred,
    // text: "Music_genre"
  },
  ORDER_TYPE: {
    color: colors.yellow,
    // text: "Order_type"
  },
  PERSON: {
    color: colors.lightseagreen,
    // text: "Person"
  },
  PLACE_NAME: {
    color: colors.slateblue,
    // text: "Place_name"
  },
  RELATION: {
    color: colors.deeppink,
    // text: "Relation"
  },
  TIME: {
    color: colors.blueviolet,
    // text: "Time, Timeofday, Time_zone"
  },
  TIMEOFDAY: {
    color: colors.dodgerblue,
    text: "",
    // hidden: true
  },
  TIME_ZONE: {
    color: colors.darkorange,
    text: "",
    // hidden: true
  },
  TRANSPORT_AGENCY: {
    color: colors.dimgray,

    // text: "Transport_agency, Transport_type",
  },
  TRANSPORT_TYPE: {
    color: colors.darkslategray,
    text: "",
    // hidden: true
  },
  WEATHER_DESCRIPTOR: {
    color: colors.burlywood,
    // text: "Weather_descriptor"
  },
}
const newIntent = {
  ALARM: { color: colors.blue, text: "Alarm_query, Alarm_remove, Alarm_set" },
  AUDIO: {
    color: colors.bottlegreen,
    text: "Audio_volume_down, Audio_volume_mute, Audio_volume_other",
  },
  CALENDAR: {
    color: colors.cobaltblue,
    text: "Calendar_query, Calendar_remove, Calendar_set",
  },
  COOKING: { color: colors.coolblack, text: "Cooking_query, Cooking_recipe" },
  DATETIME: { color: colors.cyan, text: "Datetime_convert, Datetime_query" },
  EMAIL: {
    color: colors.dark,
    text: "Email_addcontact, Email_query, Email_querycontact, Email_sendemail",
  },
  GENERAL: {
    color: colors.darktangerine,
    text: "General_greet, General_joke, General_quirky",
  },
  IOT: {
    color: colors.deepkoamaru,
    text: "Iot_cleaning, Iot_coffee, Iot_hue_lightchange, Iot_hue_lightdim, Iot_hue_lightoff, Iot_hue_lighton, Iot_hue_lightup, Iot_wemo_off, Iot_wemo_on",
  },
  LISTS: {
    color: colors.green,
    text: "Lists_createoradd, Lists_query, Lists_remove",
  },
  MUSIC: {
    color: colors.grey,
    text: "Music_dislikeness, Music_likeness, Music_query, Music_settings",
  },
  NEWS: {
    color: colors.neoncarrot,
    text: " Music_dislikeness, Music_likeness, Music_query, Music_settings",
  },
  PLAY: {
    color: colors.olivedrab,
    text: "Play_audiobook, Play_game, Play_music, Play_podcasts, Play_radio",
  },
  QA: {
    color: colors.prune,
    text: "Qa_currency, Qa_definition, Qa_factoid, Qa_maths, Qa_stock",
  },
  RECOMMENDATION: {
    color: colors.quenblue,
    text: "Qa_currency, Qa_definition, Qa_factoid, Qa_maths, Qa_stock",
  },
  SOCIAL: {
    color: colors.red,
    text: "Qa_currency, Qa_definition, Qa_factoid, Qa_maths, Qa_stock",
  },
  TAKEAWAY: {
    color: colors.smokyblack,
    text: "Takeaway_order, Takeaway_query",
  },
  TRANSPORT: { color: colors.vividred, text: "Takeaway_order, Takeaway_query" },
  WEATHER: { color: colors.yellow, text: "Weather_query" },
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
