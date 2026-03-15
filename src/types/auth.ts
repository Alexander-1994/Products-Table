export type TLoginRequest = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type TUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type TLoginResponse = TUser & {
  accessToken: string;
  refreshToken: string;
};

export type TLoginForm = Omit<TLoginRequest, 'expiresInMins'> & {
  rememberMe: boolean;
};
