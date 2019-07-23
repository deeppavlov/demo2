import axios from 'axios';

export interface StoreReq {
  question: string;
}

export type Res = [string, number, number][];

export default function (path: string) {
  return async function (stateReq: StoreReq): Promise<Res> {
    const req = {
      text1: [stateReq.question],
      text2: [null],
    };
    return await axios.post(path, req);
  };
}
