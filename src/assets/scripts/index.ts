import { Snippets } from "types"

type Category =
  | "Text Classification"
  | "Token Classification"
  | "Question Answering"
  | "Open Domain QA"
  | "GLUE"
  | "SuperGLUE"

export const scripts = {
  textClassification: {
    emotionClassification: {
      [Snippets.cli]:
        "python -m deeppavlov interact emotions_xlm_roberta_base -di",
      [Snippets.python]: `from deeppavlov import build_model
model = build_model(emotions_xlm_roberta_base, download=True, install=True)
model(['This makes me smile'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi emotions_xlm_roberta_base -di",
    },
    sentimentClassification: {
      [Snippets.cli]:
        "python -m deeppavlov interact sentiments_xlm_roberta_base -di",
      [Snippets.python]: `from deeppavlov import build_model
model = build_model(sentiments_xlm_roberta_base, download=True, install=True)
model(['This month was a bad month for Kobold Quarterly'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi sentiments_xlm_roberta_base -di",
    },
    textFewShot: {
      [Snippets.cli]: "",
      [Snippets.python]: "",
      [Snippets.restApi]: "",
    },
    topicClassification: {
      [Snippets.cli]:
        "python -m deeppavlov interact topics_xlm_roberta_base -di",
      [Snippets.python]: `from deeppavlov import build_model 
model = build_model(topics_xlm_roberta_base, download=True, install=True) 
model(['Great shirt, the talls are perfect length'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi topics_xlm_roberta_base -di",
    },
    toxicClassification: {
      [Snippets.cli]:
        "python -m deeppavlov interact insults_xlm_roberta_base -di",
      [Snippets.python]: `from deeppavlov import build_model
model = build_model(insults_xlm_roberta_base, download=True, install=True)
model(['Was in the city yesterday - didn’t notice anything strange'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi insults_xlm_roberta_base -di",
    },
    intentClassification: {
      [Snippets.cli]:
        "python -m deeppavlov interact intents_distilbert_base_multi -di",
      [Snippets.python]: `from deeppavlov import build_model 
model = build_model(intents_distilbert_base_multi, download=True, install=True) 
model(['Turn on some dance music to lift our mood'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi intents_distilbert_base_multi -di",
    },
  },
  tokenClassification: {
    entityLinking: {
      [Snippets.cli]:
        "python -m deeppavlov interact entity_extraction_en -di",
      [Snippets.python]: `from deeppavlov import build_model
model = build_model(entity_extraction_en, download=True, install=True)
model(['Axiom Space announced SpaceX will fly additional private crew missions to and from the Station through 2023.'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi entity_extraction_en -di",
    },
    namedEntityRecognition: {
      [Snippets.cli]:
        "python -m deeppavlov interact ner_xlm_roberta_base -di",
      [Snippets.python]: `from deeppavlov import build_model     
model = build_model(ner_distilbert-base-multi, download=True, install=True)
model(['Let’s order pizza delivery at Marty and Ricky’s for 3 pm.'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi ner_xlm_roberta_base -di",
    },
    partOfSpeech: {
      [Snippets.cli]: "",
      [Snippets.python]: "",
      [Snippets.restApi]: "",
    },
    tokenFewShot: {
      [Snippets.cli]: "",
      [Snippets.python]: "",
      [Snippets.restApi]: "",
    },
  },
  questionAnswering: {
    knowledgeBaseQA: {
      [Snippets.cli]:
        "python -m deeppavlov interact kbqa_lcquad2 -di",
      [Snippets.python]: `from deeppavlov import build_model
model = build_model(kbqa_lcquad2, download=True, install=True)
model(['When did Jean-Paul Sartre move to Le Havre?'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi kbqa_lcquad2 -di",
    },
    readingComprehension: {
      [Snippets.cli]: "We will add the information here later.",
      [Snippets.python]: "We will add the information here later.",
      [Snippets.restApi]: "We will add the information here later. ",
    },
  },
  openDomainQA: {
    openDomianQA: {
      [Snippets.cli]:
        "python -m deeppavlov interact en_odqa_infer_wiki -di",
      [Snippets.python]: `from deeppavlov import build_model
model = build_model(en_odqa_infer_wiki, download=True, install=True)
model(['When did the first moon landing happen?'])`,
      [Snippets.restApi]:
        "python -m deeppavlov riseapi en_odqa_infer_wiki -di",
    },
  },
  GLUE: {},
  superGLUE: {},
}
