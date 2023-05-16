import { IBaseAudit } from '../common.interface';

export interface IUser extends IBaseAudit {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: UserGenderEnum;
  mobile_number?: string;
}

export interface IUserToken {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
}

export interface ILogin extends IUserToken {
  token: string;
}

export enum UserGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others'
}

export const userListSelect = {
  first_name: true,
  last_name: true,
  email: true,
  gender: true
};
