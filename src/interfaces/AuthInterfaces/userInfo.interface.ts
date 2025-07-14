export interface IUserInfo {
	id: number;
	name: string;
	email: string;
	address?: string;
	phone?: string;
	role: 'admin' | 'user';
}
