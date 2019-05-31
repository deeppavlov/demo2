import React, { Component } from 'react';

interface OwnProps {
    skillName: string;
    skillDesc: string;
}

type Props = OwnProps;

export default class BotChat extends Component<Props> {

    render() {
        const { skillName, skillDesc } = this.props;
        return (
            <section>
                <div>
                    <h1>{skillName}</h1>
                    <p>{skillDesc}</p>
                </div>
            </section>
        )
    }
}