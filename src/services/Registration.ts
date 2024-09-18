export const BaseUrl = 'https://v2.api.noroff.dev';
export const mailRegex = /^[a-zA-Z0-9._%+-]+@stud.noroff\.no$/;
export const API_KEY = import.meta.env.VITE_API_KEY;

interface UserData {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  result?: any;
  success?: boolean;
}

export const RegisterUser = async (data: UserData): Promise<void> => {
  try {
    const response = await fetch(`${BaseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network not responding');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const LoginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
      },

      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network not responding');
    }
    const result: LoginResponse = await response.json();
    console.log('API response:', result);
    return result;
  } catch (error) {
    console.error('Unable to Login', error);
    throw error;
  }
};
