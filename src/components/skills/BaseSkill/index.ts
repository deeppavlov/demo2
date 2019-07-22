export { default } from './BaseSkill';

export interface DispatchProps {
  updateStore: (messages: any[]) => void;
}

export interface StateProps {
  answers?: any[];
}

export interface Input {
  title: string;
  type: 'text' | 'textarea';
  name: string;
}

export interface Example {
  example: string;
  // following key are equals to inputs names
  [key: string]: string;
}

export interface BaseSkillProps<Req = any, Res = any> {
  title: string;
  desc: JSX.Element;
  docker?: string;
  inputs: Input[];
  examples: Example[];
  api?: (request: Req) => Promise<Res>;
}
