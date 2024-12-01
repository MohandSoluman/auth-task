export interface IUser {
  id: string;
  name: string;
  code: number;
  startName: string;
  address: string;
}

export class User {
  id?: string;
  email?: string;
  password?: string;
  token?: string;
}
