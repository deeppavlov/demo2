import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import api, { Res, StoreReq } from "lib/api"
import { newNer } from "utils/utils"
import { CustomLink } from "components/CustomLink/CustomLink"
import { scripts } from "assets/scripts"
const config: BaseSkillProps<StoreReq, Res> = {
  title: "Name Entity Recognition",
  desc: (
    <div style={{ marginTop: "1em" }}>
      Named Entity Recognition (NER) classifies tokens in text into predefined
      categories (tags), such as
      <b> person names</b>, <b> quantity expressions</b>,
      <b> percentage expressions</b>, <b>names of locations</b>,
      <b> organizations</b>, as well as expression of <b>time</b>,{" "}
      <b>currency</b> and others. Our model was trained on a multilingual
      dataset and can recognize 30 entities. NER can be used as a knowledge
      extractor when you are interested in a piece of certain information in
      your text. To learn more on implementation read our
      <CustomLink href="https://docs.deeppavlov.ai/en/master/features/models/NER.html">
        {" documentation."}
      </CustomLink>
      <br />
      <br />
    </div>
  ),
  docker: "deeppavlov/ner_en",
  inputs: [
    {
      title: "Text",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question:
        "Computer Sciences Corp . , El Segundo , Calif . , said it is close to making final an agreement to buy Cleveland Consulting Associates from Saatchi & Saatchi",
    },
    {
      question:
        "Imo Industries Inc . -- $ 150 million of senior subordinated debentures due 2001 , priced at par to yield 12 % . ",
    },
    {
      question:
        "Poznań liegt auf halbem Weg zwischen Warschau und Berlin – diese Städte waren wichtig für den Dirigenten und Komponisten Ignatz Waghalter, einen der Mitbegründer der Deutschen Oper in Berlin-Charlottenburg. Das Orchester der Philharmonie Poznań widmet sich jetzt bereits zum zweiten Mal der Musik dieses aus Deutschland vertriebenen Komponisten. Waghalter stammte aus einer jüdischen Warschauer Familie.",
    },
    {
      question:
        "Así ha calificado en un comunicado Jay Timmons, el consejero delegado de la Asociación de Manufacturas de EEUU, la amenaza de Donald Trump de empezar el 10 de junio a imponer aranceles del 5% a la importación de bienes mexicanos e irlos subiendo hasta el mes de octubre, cuando alcanzarían el 25%. En total, el 80% de las exportaciones mexicanas van a Estados Unidos. Según Gregory Daco, economista jefe de la consultora Oxford Economics, unos aranceles del 25% rebañarían al menos siete décimas de crecimiento de EEUU en 2020, hasta dejarlo en un minúsculo 1%. Para México las consecuencias podrían ser devastadoras, y el país quedaría sepultado en una recesión.",
    },
    {
      question:
        'Члены Американской академии киноискусств решили присудить режиссеру Дэвиду Линчу почетную премию "Оскар" за выдающийся вклад в кинематограф, сообщается на сайте академии. Церемония награждения пройдет 27 октября в развлекательном комплексе Hollywood and Highland Center в Лос-Анджелесе (штат Калифорния, США).',
    },
    {
      question:
        "Geçtiğimiz sezonun devre arasında Sassuolo’ya transfer olan Merih Demiral, gösterdiği performans sonrası İtalya Seria A’nın son şampiyonu Juventus’a transfer oldu. İtalyan gazeteci Gianluca Di Marzio,kişisel twitter hesabında Merih Demiral’ın Juventus’a transferinin sonuçlandığını ve Merih’in Juventus ile 5 yıllık sözleşme imzalayacağını söyledi. Juventus, Merih’in transferi için Sassuolo’ya 15 milyon euro bonservis bedeli ödeyeceğini açıkladı.",
    },
  ],
  api: api("https://7036.deeppavlov.ai/model"),
  renderAnswer: { type: "ner", colors: newNer },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NER = skillWrapper<StoreReq, Res>("neren")
export default function () {
  return <NER {...config} />
}
