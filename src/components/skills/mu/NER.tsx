// tslint:disable: max-line-length
import React from "react"
import skillWrapper, { BaseSkillProps } from "../BaseSkill"
import api, { Res, StoreReq } from "../../../lib/api"
import { ontonotesClasses } from "../utils"
import { CustomLink } from "components/CustomLink/CustomLink"

const config: BaseSkillProps<StoreReq, Res> = {
  title: "Name Entity Recognition",
  desc: (
    <div>
      Named Entity Recognition (NER) classifies tokens in text into predefined
      categories (tags), such as <b>person names</b>,{" "}
      <b>quantity expressions</b>, <b>percentage expressions</b>,{" "}
      <b>names of locations</b>, <b>organizations</b>, as well as expression of{" "}
      <b>time</b>, <b>currency</b> and others. We can recognize up to 19
      entities. DeepPavlov also features a multilingual model that is available
      for 104 languages. NER can be used as a knowledge extractor when you are
      interested in a piece of certain information in your text. To learn more
      on implementation read our{" "}
      <CustomLink href="http://docs.deeppavlov.ai/en/master/features/models/ner.html">
        documentation.
      </CustomLink>
      <br />
      Number of defined classes depends on the language.
      <br />
      <br />
      Click on an entity to see its class description
      <br />
    </div>
  ),
  docker: "deeppavlov/ner_ml",
  inputs: [
    {
      title: "Question",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question: `Icy conditions have swept across eastern Australia, bringing snow to areas as far north as subtropical Queensland. Australia's Bureau of Meteorology described it as a "rare" sight, noting the state had not experienced significant snowfall since 2015. Severe weather warnings have also been issued for a 1,000km (620 miles) stretch of coast which includes Sydney. Meteorologist Lachlan Stone said the snowfall in Queensland was an unusual occurrence in a state with a sub-tropical to tropical climate.`,
    },
    {
      question:
        'Члены Американской академии киноискусств решили присудить режиссеру Дэвиду Линчу почетную премию "Оскар" за выдающийся вклад в кинематограф, сообщается на сайте академии. Церемония награждения пройдет 27 октября в развлекательном комплексе Hollywood and Highland Center в Лос-Анджелесе (штат Калифорния, США).',
    },
    {
      question:
        "Після аномальної весни, що увійшла в десятку найтепліших за 139 років спостережень, літо теж починаєтся зі спеки. Про це повідомила синоптик Наталка Діденко на своїй сторінці в соцмережі Facebook. Так, у середу 5 червня Україна буде залишатися однією з найбільш спекотних країн Європи: завтра вдень очікується + 24 + 29 градусів, на Сході та Півдні +28 +33 градуси. За словами синоптика, у Франції, Великобританії і місцями навіть в Іспанії та Португалії в середу похолодає до + 10 + 15 градусів і пройдуть дощі.",
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
        "Geçtiğimiz sezonun devre arasında Sassuolo’ya transfer olan Merih Demiral, gösterdiği performans sonrası İtalya Seria A’nın son şampiyonu Juventus’a transfer oldu. İtalyan gazeteci Gianluca Di Marzio,kişisel twitter hesabında Merih Demiral’ın Juventus’a transferinin sonuçlandığını ve Merih’in Juventus ile 5 yıllık sözleşme imzalayacağını söyledi. Juventus, Merih’in transferi için Sassuolo’ya 15 milyon euro bonservis bedeli ödeyeceğini açıkladı.",
    },
  ],
  api: api("https://7013.deeppavlov.ai/model"),
  renderAnswer: { type: "ner", colors: ontonotesClasses },
}

const NER = skillWrapper<StoreReq, Res>("nermu")
export default function () {
  return <NER {...config} />
}
