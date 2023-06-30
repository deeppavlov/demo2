export const btns: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
export const routesBtns: string[] = [
  "Text Classification",
  "Token Classification",
  "Question Answering",
  "GLUE",
  "SuperGLUE",
]

export const routes = [
  {
    title: "Text Classification",
    child: [
      { title: "Intent", link: "" },
      { title: "Topicc", link: "" },
      { title: "Sentiment", link: "" },
      { title: "Toxic", link: "" },
      { title: "Emotion", link: "" },
      { title: "Few-Shot", link: "" },
    ],
    link: "",
  },
  {
    title: "Token Classification",
    child: [
      { title: "titled Entity", link: "" },
      { title: "Part of Speech", link: "" },
      { title: "Entity titleing", link: "" },
      { title: "Few-Shot", link: "" },
    ],
    link: "",
  },
  {
    title: "Question Answering",
    child: [
      { title: "titled Entity", link: "" },
      { title: "Part of Speech", link: "" },
      { title: "Entity titleing", link: "" },
      { title: "Few-Shot", link: "" },
    ],
    link: "",
  },
  { title: "GLUE", child: [], link: "" },
  { title: "SuperGlue", child: [], link: "" },
]
export const routesForDemo = {
  "Text Classification": [
    { title: "Intent Classification", link: "text_intent" },
    { title: "Topic", link: "text_topic" },
    { title: "Sentiment", link: "text_sentiment" },
    { title: "Toxic", link: "text_toxic" },
    { title: "Emotion", link: "text_emotion" },
    { title: "Few-Shot", link: "text_few_shot" },
  ],
  "Token Classification": [
    { title: "Titled Entity", link: "token_titled_entity" },
    { title: "Part of Speech", link: "token_part_of_speech" },
    { title: "Entity Titleing", link: "token_entity_titleing" },
    { title: "Few-Shot", link: "token_few_shot" },
  ],
  "Question Answering": [
    { title: "Titled Entity", link: "qa_titled_entity" },
    { title: "Part of Speech", link: "qa_part_of_speech" },
    { title: "Entity titleing", link: "qa_entity_titleing" },
    { title: "Few-Shot", link: "qa_few_shot" },
  ],
  GLUE: [],
  SuperGlue: [],
}
