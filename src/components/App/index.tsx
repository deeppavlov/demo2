import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import BotChat, { TEXTS } from '../BotChat';

class App extends Component {

  odqaOnSubmit = (q: string) => () => {
    axios.post('https://7004.lnsigo.mipt.ru/answer', {
      text1: [q]
    }).then(response => console.log(response))
  }

  render () {
    return (
      <>
        <header className="App-header">
          <h1>
            NLP Framework DeepPavlov for conversational AI development
          </h1>
          <div className="App-header-button">
            REQUEST EXCLUSIVE DEVELOPMENT
          </div>
        </header>
        <main className="App-main">
            <section className="App-main-header">
              <h1>
                NLP Framework DeepPavlov for conversational AI development
              </h1>
              <p>
                Here you can test the components of our library. If you need our help with development or integration, leave a request here.
              </p>
              <p>
                If you want to find out more about our lab and our services, check out our info page.
              </p>
            </section>
            <BotChat skill={TEXTS.odqa.en} onSubmit={this.odqaOnSubmit} messages={[
              { who: 'you', text: 'hello' },
              { who: 'bot', text: 'hello' },
              { who: 'you', text: 'can you here me?' },
              { who: 'bot', text: 'hello' },
              { who: 'you', text: 'can you here me?' },
              { who: 'bot', text: 'hello' },
              { who: 'you', text: 'can you here me?' },
              { who: 'bot', text: 'hello' },
            ]}/>
        </main>
      </>
    );
  }
}

export default App;
