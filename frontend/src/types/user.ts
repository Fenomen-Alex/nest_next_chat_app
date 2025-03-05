export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created: Date;
  updated: Date;
  role: 'admin' | 'user';
};
