import type { TLoginRequest, TLoginResponse, TUser } from '~/types/auth';

class AuthService {
  static async login(credentials: TLoginRequest): Promise<TLoginResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Неверный логин или пароль');
    }

    return response.json();
  }

  static async getMe(token: string): Promise<TUser> {
    const response = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorMessage =
        response.status === 401
          ? 'Ваша сессия исеткла. Авторизируйтесь повторно.'
          : 'Что-то пошло не так. Попробуйте авторизироваться повторно';

      throw new Error(errorMessage);
    }

    return response.json();
  }

  static setTokens(rememberMe: boolean, accessToken: string) {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem('accessToken', accessToken);
  }

  static getAccessToken() {
    return (
      sessionStorage.getItem('accessToken') ||
      localStorage.getItem('accessToken')
    );
  }

  static clearTokens() {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
  }
}

export default AuthService;
