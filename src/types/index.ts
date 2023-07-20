export interface IMe {
  id: string;
  name: string;
  time: string;
}

export interface IMember {
  id: string;
  account: string;
  username: string;
  role: number[];
  created_at: string;
}

export interface IPage {
  current: number;
  count: number;
  size: number;
  last: number;
}

export interface ISelectOption {
  id: string;
  label: string;
}
