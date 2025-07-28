export interface IUserInfo {
	id: string;
	name: string;
	email: string;
	address?: string;
	phone?: string;
	role: 'admin' | 'user';
}

export interface IUserFormValues extends IUserInfo {
	password?: string;
	confirmPassword?: string;
}
