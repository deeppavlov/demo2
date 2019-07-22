import React, { Component, ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State as Store, updatestore } from '../../../lib/store';

// Moved interfaces into index file because of --isolatedModules
// https://github.com/Microsoft/TypeScript/issues/21194

import { BaseSkillProps, DispatchProps, StateProps, Example, Input } from './';

type Props<Req, Res> = BaseSkillProps<Req, Res> & DispatchProps & StateProps;

interface State {
  [key:string]: string;
}

class BaseSkill<Req, Res> extends Component<Props<Req, Res>, State>{

  constructor(props: Props<Req, Res>) {
    super(props);

    const { inputs, examples } = props;
    const initState: any = {};
    inputs.forEach((input: Input) => {
      initState[`${input.name}`] = examples[0][input.name];
    });
    this.state = initState;
  }

  renderInput = (input: Input, i: number) => (
    <div key={i}>
      <p>{input.title}</p>
      {input.type === 'text' && (
        <input
          placeholder={input.title}
          value={this.state[`${input.name}`]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ [`${input.name}`]: e.target.value })}
        />
      )}
      {input.type === 'textarea' && (
        <textarea
          placeholder={input.title}
          value={this.state[`${input.name}`]}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ [`${input.name}`]: e.target.value })}
        />
      )}
    </div>
  )

  renderExamples = (ex: Example, i: number) => {
    return (
      <div onClick={() => this.setState(ex)} key={i} >
        {ex.example}
      </div>
    );
  }

  render() {
    const { title, desc, updateStore, answers, docker, inputs, examples } = this.props;
    console.log(updateStore, this.state);
    return <div>
      <p>{title}</p>
      {desc && <div>{desc}</div>}
      {docker && (
        <a href={`https://hub.docker.com/r/${docker}`}>
          <svg width="60" height="43" viewBox="0 0 60 43">
              <g fill="#6395ca">
                  {/* tslint:disable-next-line: max-line-length */}
                  <path d="M3.757 15.768h6.04v5.873h-6.04V15.77zM11.17 15.768h6.04v5.873h-6.04V15.77zM11.17 8.24h6.04v5.87h-6.04V8.24zM18.58 15.768h6.043v5.873H18.58V15.77zM18.58 8.24h6.043v5.87H18.58V8.24zM25.993 15.768h6.042v5.873h-6.042V15.77zM25.993 8.24h6.042v5.87h-6.042V8.24zM33.405 15.768h6.042v5.873h-6.042V15.77zM25.993.708h6.042V6.58h-6.042V.708zM12.194 30.12c-.93 0-1.684.733-1.684 1.636 0 .902.755 1.635 1.684 1.635.928 0 1.683-.732 1.683-1.634 0-.903-.755-1.637-1.683-1.637"/>
                  {/* tslint:disable-next-line: max-line-length */}
                  <path d="M58.905 18.806c-2.03-1.138-4.73-1.294-7.03-.636-.283-2.377-1.89-4.46-3.8-5.953l-.758-.593-.638.716c-1.28 1.438-1.66 3.83-1.487 5.666.13 1.35.565 2.722 1.42 3.806-.65.38-1.388.682-2.045.9-1.34.44-2.795.685-4.21.685H.613l-.085.89c-.285 2.972.134 5.947 1.398 8.66l.544 1.078.062.1c3.737 6.17 10.3 8.768 17.452 8.768 13.846 0 25.265-6.01 30.51-18.708 3.505.178 7.09-.83 8.805-4.083l.437-.83-.832-.466zm-46.71 16.056c-1.764 0-3.198-1.394-3.198-3.106 0-1.713 1.434-3.107 3.197-3.107 1.763 0 3.197 1.393 3.197 3.106 0 1.712-1.433 3.106-3.196 3.106z"/>
              </g>
          </svg>
          <span>
            docker pull {docker}
          </span>
        </a>
      )}
      {inputs.map(this.renderInput)}
      <div>
        {examples.map(this.renderExamples)}
      </div>
      {answers && answers}
    </div>;
  }
}

function withConnect<Req, Res>(stateKey: string) {
  return connect<StateProps, DispatchProps, BaseSkillProps<Req, Res>>(
    (state: Store) => ({ answers: state[stateKey] }),
    (dispatch: Dispatch) => ({ updateStore: (messages: any[]) => dispatch(updatestore(stateKey, messages)) }),
  )(BaseSkill);
}

export default withConnect;
