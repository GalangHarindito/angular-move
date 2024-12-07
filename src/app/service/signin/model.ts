export interface UserModel {
    email: string;
    password: string;
}

export interface Session {
    userId: string;
    fullname: string;
    lastname: string;
    email: string;
}