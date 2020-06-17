export { default } from './ChatSkill';

export interface DispatchProps {
  updateStore: (messages: any[]) => void;
  dispatchLoading: () => void;
  safeComponentState: (state: any) => void;
}

export interface Answer {
  question: string;
  answer: string;
  utt_id: string;
  rating: number;
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
  dialogRating: (dialog_id: string, rating: number) => Promise<Res>;
  utteranceRating: (utterance_id: string, rating: number) => Promise<Res>;
}
