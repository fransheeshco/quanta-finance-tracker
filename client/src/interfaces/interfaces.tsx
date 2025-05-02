import { ReactNode } from 'react';


export type UserToken = {
  token: string;
  user: {
    fname: string;
    email: string;
  }

};
export type User = {
  fname: string,
  email: string
}
