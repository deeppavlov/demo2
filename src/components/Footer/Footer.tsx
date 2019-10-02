import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import style from './Footer.module.scss';
import img from './DeepPavlov.png';

type Props =  RouteComponentProps;

interface State {
  lang: 'ru' | 'en' | 'mu';
}

class Nav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lang: 'en',
    };
  }
  componentDidMount() {
    const { location: { pathname } } = this.props;
    if (pathname === '/') {
      this.setState({ lang: 'en' });
    } else {
      this.setState({ lang: pathname.split('/')[1] as 'ru' | 'en' | 'mu' });
    }
  }
  static getDerivedStateFromProps(props: Props) {
    const { location: { pathname } } = props;
    return { lang: pathname.split('/')[1] as 'ru' | 'en' | 'mu' };
  }

  render () {
    const { lang } = this.state;
    return (
      <footer className={style.footer}>
        <div className={style.contactUs}>
            <p>{
              lang !== 'ru' ? 'Also, you can train this model on your own data, or we can do it for you, contact ' :
              'Вы можете обучить эту модель на своих данных или мы можем сделать это за вас, напишите нам '
            }
            <a href="mailto:partner@ipavlov.ai">partner@ipavlov.ai</a></p>
        </div>
        <div className={style.saas}>
          <p>SaaS</p>
          <div>
            {
              lang !== 'ru' ? <>
                If you are an advanced user and our demo don't meet
                  your specific needs, you can try our free alpfa version
                  <a href="http://2276.lnsigo.mipt.ru/" target="_blank" rel="noopener noreferrer">
                    {' SaaS platform '}
                  </a>
                  on your data.
              </> :
              <>
                Если вы продвинутый пользователь и наше демо не удовлетворяет вашим потребностям,
                  вы можете попробовать нашу бесплатную альфа версию
                  <a href="http://2276.lnsigo.mipt.ru/" target="_blank" rel="noopener noreferrer">
                    {' SaaS платформы '}
                  </a> на ваших данных.</>
            }
          </div>
        </div>
        <a href="https://github.com/deepmipt">
            <img src={img} alt="powered by DeepPavlov"/>
            © deepmipt on GitHub
        </a>
      </footer>
    );
  }

}

export default withRouter(Nav);
