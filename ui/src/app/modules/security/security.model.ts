export interface IRole {
    id: number;
    name: string;
    desc: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    mobile: string;
    roles: IRole[];
    gender: string;
    status: string;
}