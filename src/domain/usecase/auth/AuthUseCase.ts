import { USER } from "../../../utils/Constanta";
import { ThrowError } from "../../../utils/Error";
import { User } from "../../entity/User";
import { IAuthUseCase } from "./IAuthUseCase";

export class AuthUseCase implements IAuthUseCase {
  private storage: Storage;
  constructor() {
    this.storage = localStorage;
  }
  checkAuth = (): boolean => {
    try {
      const user = this.storage.getItem(USER);
      if (user == null) throw Error("No user object");

      const parsed: User = JSON.parse(user);

      return parsed.username != null && parsed.created != null;
    } catch (error) {
      return false;
    }
  };
  getUsername = (): string => {
    try {
      const user = this.storage.getItem(USER);
      if (user == null) throw ThrowError("No user found!");

      const parsed: User = JSON.parse(user);
      return parsed.username;
    } catch (error) {
      throw ThrowError(error);
    }
  };
  logout = (): void => {
    try {
      this.storage.clear();
    } catch (error) {
      throw ThrowError(error);
    }
  };
  login = (username: string): void => {
    try {
      const currentDate = new Date();

      const newUser: User = {
        username: username,
        created: currentDate,
      };
      this.storage.setItem(USER, JSON.stringify(newUser));
    } catch (error) {
      throw ThrowError(error);
    }
  };
}
