import type { LoginCredentials, AuthResponse, User } from '@/types/auth';

const API_BASE = 'https://dummyjson.com/auth';

class AuthService {
  // Логин
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      // credentials: 'include', // Куки с токенами
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  // Текущий пользователь
  static async getMe(token: string): Promise<User> {
    const response = await fetch(`${API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }

  // Рефреш токена
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      // credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  }

  static getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  static setTokens(tokens: { accessToken: string; refreshToken: string }) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  static clearTokens() {
    console.log('!!!!!!!!!!');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export default AuthService;
