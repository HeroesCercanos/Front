export interface ICampaign {
  title: string;
  description: string;
  startDate: string;
  id: number;
  endDate: string;
  isActive: boolean;
}

export interface Need {
  id: number;
  type: string;
  quantity: number;
  status: string;
  quarterId: number;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

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

export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface IUserSession {
    token: string,
    user: {
        id: number,
        email: string,
        name: string,
        donations: []
    }
}
