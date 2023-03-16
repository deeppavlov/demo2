import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import style from './Footer.module.scss';
import img from './DeepPavlov.png';
import { Language } from 'components/skills/utils';

type Props =  RouteComponentProps;

interface State {
  lang: Language;
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
      this.setState({ lang: pathname.split('/')[1] as Language });
    }
  }
  static getDerivedStateFromProps(props: Props) {
    const { location: { pathname } } = props;
    return { lang: pathname.split('/')[1] as Language };
  }

  render () {
    return (
      <footer className={style.footer}>
        {false && <div className={style.saas}>
          <p>Docker</p>
          <a
          href="http://docs.deeppavlov.ai/en/master/intro/quick_start.html#docker-images"
          rel="noopener noreferrer"
          target="_blank"
          >
            DeepPavlov Docker images reference
          </a>
        </div>}
        <a href="https://github.com/deeppavlov">
            <img src={img} alt="powered by DeepPavlov"/>
            © DeepPavlov on GitHub
        </a>
      </footer>
    );
  }

}

export default withRouter(Nav);
