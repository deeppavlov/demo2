import React, { Component } from 'react';

export { TEXTS } from './texts';

interface OwnProps {
    skill: {
        title: string;
        desc: string;
    }
    
}

type Props = OwnProps;

export default class BotChat extends Component<Props> {

    render() {
        const { title, desc } = this.props.skill;
        return (
            <section>
                <header>
                    <h1>{title}</h1>
                    <p>{desc}</p>
                </header>
            </section>
        )
    }
}