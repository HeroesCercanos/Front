export interface IUserSession {
    token: string,
    user: {
        id: number,
        email: string,
        name: string,
        donations: []
        role: "admin" | "user"
    }
}