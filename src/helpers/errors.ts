import { ErrorBase } from "./errorHandler";
enum AuthErrors {
    UserDoesNotExist = "User does not exists",
    InvalidPassword = "Password is invalid"
}
enum RegisterErrors {
    AlreadyRegistered = "Email is already registered",
}

 export class LoginError extends ErrorBase<AuthErrors>{}

 export class RegisterError extends ErrorBase<RegisterErrors>{}
