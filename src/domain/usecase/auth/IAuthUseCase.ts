export interface IAuthUseCase {
  logout: () => void;
  login: (username: string) => void;
  checkAuth: () => boolean;
  getUsername: () => string;
}
