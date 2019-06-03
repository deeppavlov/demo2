import React from 'react';
import './App.css';

import BotChat, { TEXTS } from '../BotChat';

function App() {
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
          <BotChat skill={TEXTS.odqa.en}/>
      </main>
    </>
  );
}

export default App;
