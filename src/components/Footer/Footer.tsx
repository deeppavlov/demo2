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
              lang !== 'ru' ? 'You can train this model on your own data, or we can do it for you, contact ' :
              'Вы можете обучить эту модель на своих данныхб или мы можем сделать это за вас, напишите нам '
            }
            <a href="mailto:partner@ipavlov.ai">partner@ipavlov.ai</a></p>
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
