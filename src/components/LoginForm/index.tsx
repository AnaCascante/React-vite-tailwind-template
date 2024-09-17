import { LoginUser, mailRegex } from '../../services/Registration';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError('Invalid email');
    setPasswordError('Invalid password');
    let isFormValid = true;

    if (!email) {
      setEmailError('Email is required');
      isFormValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isFormValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isFormValid = false;
    }

    if (!mailRegex.test(email.trim().toLocaleLowerCase())) {
      setEmailError('Email must be a valid stud.noroff.no email');
      isFormValid = false;
    }

    if (isFormValid) {
      try {
        const result: { token?: string } = await LoginUser({
          email: email.trim().toLocaleLowerCase(),
          password,
        });

        if (result !== undefined && result.token) {
          localStorage.setItem('accessToken', result.token);
          alert('Login successful');
          window.location.href = '/profile';
        }
      } catch (error) {
        console.error(error);
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
