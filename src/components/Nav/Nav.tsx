import React, { Component } from "react";
import cn from "classnames";
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom";

import style from "./Nav.module.scss";
import { Language } from "components/skills/utils";

type Props = RouteComponentProps;

interface State {
  lang: Language;
  component: {
    ru: string;
    en: string;
    mu: string;
    zh: string;
  };
}

const ROUTES = {
  ru: [
    { title: "Ответы на вопросы по тексту", link: "textqa" },
    { title: "Ответы на вопросы по Википедии", link: "odqa" },
    { title: "Распознавание именованных сущностей", link: "ner" },
    { title: "Анализ тональности", link: "sentiment" },
    { title: "Семантическое следование", link: "superglueterra" },
    { title: "Да/Нет QA", link: "supergluedanetqa" },
  ],
  en: [
    { title: "Entity recognition", link: "ner" },
    { title: "Text QA", link: "textqa" },
    { title: "ODQA", link: "odqa" },
    { title: "Ranking", link: "ranking" },
    { title: "Intent classification", link: "intent" },
    { title: "Insult detection", link: "insult" },
    { title: "Dream", link: "chat" },
  ],
  mu: [
    { title: "Text QA", link: "textqa" },
    { title: "Entity recognition", link: "ner" },
  ],
  zh: [{ title: "Text QA", link: "textqa" }],
};

class Nav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lang: "en",
      component: {
        ru: "",
        en: "",
        mu: "",
        zh: "",
      },
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const {
      location: { pathname },
      history,
    } = props;
    const { component } = state;
    if (pathname === "/" || pathname === "") {
      history.push(`/en/${ROUTES.en[0].link}`);
      return { lang: "en", component: { ...component, en: ROUTES.en[0].link } };
    }
    return {
      lang: pathname.split("/")[1] as Language,
      component: {
        ...component,
        [pathname.split("/")[1]]: pathname.split("/")[2],
      },
    };
  }

  langChange = (lang: Language) => () => {
    if (this.state.lang === lang) return;

    const { component } = this.state;
    let newRoute = ROUTES[lang][0].link;
    if (component[lang]) {
      newRoute = component[lang];
    }
    const { history } = this.props;
    history.push(`/${lang}/${newRoute}`);
    this.setState({ lang });
  };

  renderNavLinks = (lang: Language) => {
    const links = ROUTES[lang];
    return links.map((item, index: number) => {
      return (
        <li key={index}>
          <NavLink
            to={`/${lang}/${item.link}`}
            exact
            activeClassName={style.activeLink}
            className={style.navLink}
          >
            {item.title}
          </NavLink>
        </li>
      );
    });
  };

  render() {
    const { lang } = this.state;
    return (
      <nav className={style.nav}>
        <ul className={style.navLinks}>{this.renderNavLinks(lang)}</ul>
        <div className={style.langSelector}>
          <div
            className={cn(lang === "ru" && style.active)}
            onClick={this.langChange("ru")}
          >
            Ru
          </div>
          <div
            className={cn(lang === "en" && style.active)}
            onClick={this.langChange("en")}
          >
            En
          </div>
          <div
            className={cn(lang === "zh" && style.active)}
            onClick={this.langChange("zh")}
          >
            Zh
          </div>
          <div
            className={cn(lang === "mu" && style.active)}
            onClick={this.langChange("mu")}
          >
            Multi-Lang
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
