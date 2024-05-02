import { ErrorBase } from "./errorHandler";
export enum AuthErrors {
  UserDoesNotExist = "User does not exists",
  InvalidPassword = "Password is invalid",
  TokenIsNotValid = "Token is invalid",
  NotAuthenticated = "You are not authenticeted",
}
enum RegisterErrors {
  AlreadyRegistered = "Email is already registered",
}

export class LoginError extends ErrorBase<AuthErrors> {}

export class RegisterError extends ErrorBase<RegisterErrors> {}
