export interface Iuser {
    id: string,
    firstName: any,
    lastName: string,
    email: string,
    gender: string,
    password: string;
    confirmPassword: string;
    role: string;
    phone: number;

}

export interface address {
    city: string;
    country: string;
    street: string;
    state: string;

}