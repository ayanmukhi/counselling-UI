export class LoginResponse {
    success: boolean;
    data: {
        sic:number;
        role:string;
    };
    token:string;
}