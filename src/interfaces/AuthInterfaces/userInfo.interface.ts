export interface IUserInfo {
	id: string;
	name: string;
	email: string;
	address?: string;
	phone?: string;
	role: 'admin' | 'user';
}
