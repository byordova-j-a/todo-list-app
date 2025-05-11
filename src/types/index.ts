export enum EColor {
  RED = 'red',
  BLUE = 'blue',
}

export enum ETaskStatus {
  ACTIVE = 'active',
  DONE = 'done',
}

export enum EFilterOption {
  ALL = 'all',
  ACTIVE = 'active',
  DONE = 'done',
}

export type TTask = {
  id: number;
  name: string;
  status: ETaskStatus;
};

export type TExtendedTask = TTask & {
  created_at: string;
};
