import { LoginUser, mailRegex } from '../../services/Registration';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { meLocalStorage, setLocalStorage } from '../../services/localStorage';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    let isFormValid = true;

    if (!email) {
      setEmailError('Email is required');
      isFormValid = false;
    } else if (!mailRegex.test(email.trim().toLocaleLowerCase())) {
      setEmailError('Email must be a valid stud.noroff.no email');
      isFormValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isFormValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isFormValid = false;
    }

    if (isFormValid) {
      try {
        // Log the object being sent to check its format
        const loginData = {
          email: email.trim().toLocaleLowerCase(),
          password,
        };
        console.log('Sending login data:', loginData);

        const result = await LoginUser(loginData);

        if (result && result.token) {
          setLocalStorage('accessToken', result.token);
          console.log(
            'Token stored in local storage:',
            meLocalStorage('accessToken')
          );
          alert('Login successful');
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error during login', error);
        alert('Login failed');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-1/2 flex-col space-y-4 p-4"
    >
      <label htmlFor="email" className="text-lg font-semibold">
        Email
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
          autoComplete="off"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
      </label>
      <label htmlFor="password" className="text-lg font-semibold">
        Password
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
      </label>
      <button type="submit" className="rounded bg-blue-500 p-2 text-white">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
