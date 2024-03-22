import { ErrorBase } from "./errorHandler";


enum AuthErrors {
    UserDoesNotExist = "User does not exists",
    InvalidPassword = "Password is invalid"
}

type LoginErrors=
|'USER_DOES_NOT_FOUND'
|'INVALID_PASSWORD'
|'EMAIL_AND_PASSWORD_REQUIRED';
 export class LoginError extends ErrorBase<LoginErrors>{}
