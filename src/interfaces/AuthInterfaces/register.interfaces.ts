export interface IRegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterResponse {
  id: string;
  name: string;
  email: string;
  token?: string;
}