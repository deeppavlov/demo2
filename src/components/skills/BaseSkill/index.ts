export { default } from './BaseSkill';

export interface DispatchProps {
  updateStore: (messages: any[]) => void;
}

export interface Answer {
  question: string;
  answer: string[][];
  [key: string]: string | string[][];
}

export interface StateProps {
  answers?: Answer[];
}

export interface Input {
  title: string;
  type: 'text' | 'textarea';
  name: string;
}

export interface Example {
  question: string;
  // following key are equals to inputs names
  [key: string]: string;
}

interface RenderAnswer {
  type: 'basic' | 'ner' | 'textqa' | 'ranking' | 'intent';
  colors?: { [key: string]: string };
}

export interface BaseSkillProps<Req, Res> {
  title: string;
  desc: JSX.Element;
  docker?: string;
  inputs: Input[];
  examples: Example[];
  api: (request: Req) => Promise<Res>;
  renderAnswer?: RenderAnswer;
}
