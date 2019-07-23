import React, { Component } from 'react';
import cn from 'classnames';
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';

import style from './Nav.module.scss';

type Props =  RouteComponentProps;

interface State {
  lang: 'ru' | 'en' | 'mu';
}

const ROUTES = {
  ru: [
    { title: 'Ответы на вопросы по тексту', link: 'textqa' },
    { title: 'Ответы на вопросы', link: 'odqa' },
    { title: 'Распознование именованных сущностей', link: 'ner' },
    { title: 'Анализ тональности', link: 'insult' },
  ],
  en: [
    { title: 'Text QA', link: 'textqa' },
    { title: 'ODQA', link: 'odqa' },
    { title: 'Ranking', link: 'ranking' },
    { title: 'Entity recognition', link: 'ner' },
    { title: 'Intent classification', link: 'intent-classification' },
    { title: 'Insult detection', link: 'insult' },
  ],
  mu: [
    { title: 'Text QA', link: 'textqa' },
    { title: 'Entity recognition', link: 'ner' },
  ],
};

class Nav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lang: 'en',
    };
  }

  componentDidMount() {
    const { location: { pathname }, history } = this.props;
    if (pathname === '/') {
      history.push(`/en/${ROUTES.en[0].link}`);
      this.setState({ lang: 'en' });
    } else {
      this.setState({ lang: pathname.split('/')[1] as 'ru' | 'en' | 'mu' });
    }
  }

  langChange = (lang: 'ru' | 'en' | 'mu') => () => {
    const { history } = this.props;
    history.push(`/${lang}/${ROUTES[lang][0].link}`);
    this.setState({ lang });
  }

  renderNavLinks = (lang: 'ru' | 'en' | 'mu') => {
    const links = ROUTES[lang];
    return links.map((item, index: number) => {
      return (
        <li key={index}>
          <NavLink
            to={`/${lang}/${item.link}`} exact activeClassName={style.activeLink} className={style.navLink}>
            {item.title}
          </NavLink>
        </li>
      );
    });
  }

  render () {
    const { lang } = this.state;
    return (
      <nav className={style.nav}>
        <ul className={style.navLinks}>
          {this.renderNavLinks(lang)}
        </ul>
        <div className={style.langSelector}>
          <div className={cn(lang === 'ru' && style.active)} onClick={this.langChange('ru')}>Ru</div>
          <div className={cn(lang === 'en' && style.active)} onClick={this.langChange('en')}>En</div>
          <div className={cn(lang === 'mu' && style.active)} onClick={this.langChange('mu')}>Multi-Lang</div>
        </div>
      </nav>
    );
  }

}

export default withRouter(Nav);
