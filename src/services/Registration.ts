const BaseUrl = 'https://v2.api.noroff.dev/';

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

export const LoginUser = async (data: LoginData): Promise<void> => {
  try {
    const response = await fetch(`${BaseUrl}/auth/login`, {
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
