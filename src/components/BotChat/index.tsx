import React, { Component, ChangeEvent } from 'react';
import './BotChat.css';

export { TEXTS } from './texts';

type WHO = 'you' | 'bot';

interface Message {
    who: WHO;
    text: string;
}

interface OwnProps {
    skill: {
        title: string;
        desc: string;
    }
    messages?: Message[];
    defaultQuestions?: string[];
    onSubmit: (q: string) => () => void;
    
}

interface State {
    input: string;
}

type Props = OwnProps;

export default class BotChat extends Component<Props, State> {
    state = { input: '' }

    renderMessages = (item: Message, key: number) => {
        return (
            <div key={key} className={item.who === 'you' ? 'BotChat-your_message' : 'BotChat-bots_message'}>
                {`${item.who}: ${item.text}`}
            </div>
        )
    }

    onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.persist();
        this.setState({ input: e.target.value })
    }

    render() {
        const { skill : { title, desc }, messages, defaultQuestions, onSubmit } = this.props;
        const { input } = this.state;
        return (
            <section>
                <header>
                    <h1 className="BotChat-title">{title}</h1>
                    <p>{desc}</p>
                </header>
                <div className="BotChat-chat">
                    <div className="BotChat-messages">
                        {messages ? messages.map(this.renderMessages) : 'Chat here'}
                    </div>
                    <div className="BotChat-input">
                        <div>
                            Choose one of the questions below or type your own in the text field. And then press the 'Get answer' button or Enter.
                        </div>
                        <div className="BotChat-defaultQuestions">
                            {defaultQuestions && defaultQuestions.map((item: string, key: number) => (
                                <div className="BotChat-dq" key={key}>{item}</div>
                            ))}
                        </div>
                        <div>
                            <input type="text" value={input} onChange={this.onInputChange}/>
                            <button onClick={onSubmit(input)}>Get Answer</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}