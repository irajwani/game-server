import { Request } from 'express';
import { IUser } from '../../User/Types/user';

export type ProtectedResourceRequest = Request & { user: IUser };
