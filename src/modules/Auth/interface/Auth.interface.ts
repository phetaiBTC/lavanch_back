export interface AuthPayload {
    id: number;
    username: string;
    email: string;
    iat?: number;
    exp?: number;
}