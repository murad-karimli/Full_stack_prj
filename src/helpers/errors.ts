import { ErrorBase } from "./errorHandler";
export enum AuthErrors {
  UserDoesNotExist = "User does not exists",
  InvalidPassword = "Password is invalid",
  TokenIsNotValid = "Token is invalid",
  NotAuthenticated = "You are not authenticeted",
}

export enum ShortenerErrors {
  NotFound = "Shortened URL not found",
}
enum RegisterErrors {
  AlreadyRegistered = "Email is already registered",
}

export class LoginError extends ErrorBase<AuthErrors> {}
export class ShortenerError extends ErrorBase<ShortenerErrors>{}

export class RegisterError extends ErrorBase<RegisterErrors> {}
