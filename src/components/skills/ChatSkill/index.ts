export { default } from './ChatSkill';

export interface DispatchProps {
  updateStore: (messages: any[]) => void;
  dispatchLoading: () => void;
  safeComponentState: (state: any) => void;
}

export interface Answer {
  question: string;
  answer: string[][];
  [key: string]: string | string[][];
}

export interface StateProps {
  loading?: boolean;
  answers?: Answer[];
  componentState?: any;
}

export interface ChatSkillProps<Res> {
  title: string;
  desc: JSX.Element;
  messageApi: (text: string) => Promise<Res>;
  resetApi: () => Promise<Res>;
}
