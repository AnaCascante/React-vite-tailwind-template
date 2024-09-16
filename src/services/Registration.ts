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
