export interface IUserSession {
    token: string,
    user: {
        id: string,
        email: string,
        name: string,
        donations: []
        role: "admin" | "user"
    }
}