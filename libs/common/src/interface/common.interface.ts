import { IUserToken } from './user/user.interface';

export interface IBaseAudit {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IKeyMapping<T = string> {
  [key: string]: T;
}

export interface IRequest {
  user: IUserToken;
}

export interface IExceptionResponse {
  message?: string | Array<string>;
  statusCode?: number;
  error?: string;
}

export interface IErrorResponse {
  code: number;
  message: string;
}

export interface IListInterface<T> {
  list: T[];
  total_item_count: number;
  limit: number;
}

export type FindAndCount<T> = [T[], number];
