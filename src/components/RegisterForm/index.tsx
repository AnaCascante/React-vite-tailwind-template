import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser, mailRegex } from '../../services/Registration';
import { setLocalStorage } from '../../services/localStorage';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [venueManager, setVenueManager] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
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

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isFormValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isFormValid = false;
    }

    if (isFormValid) {
      try {
        const registerData = {
          name: name.trim(),
          email: email.trim().toLocaleLowerCase(),
          password,
          bio: '',
          avatar: { url: '', alt: '' },
          banner: { url: '', alt: '' },
          venueManager,
        };

        const result = await RegisterUser(registerData);

        console.log('Register response:', result);

        if (result && (result as any).data) {
          const data = (result as any).data;
          setLocalStorage('token', data.accessToken);
          setLocalStorage('user', JSON.stringify(data));
          setLocalStorage('venueManager', data.venueManager);

          console.log(
            'Token stored in local storage:',
            localStorage.getItem('token')
          );

          alert('Registration successful');
          navigate('/profile');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed');
      }
    }
  };

  return (
    <form
      className="mx-auto mt-12 flex w-11/12 max-w-xs flex-col"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {nameError && <p className="text-xs text-red-500">{nameError}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {emailError && <p className="text-xs text-red-500">{emailError}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {confirmPasswordError && (
        <p className="text-xs text-red-500">{confirmPasswordError}</p>
      )}
      <label className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={venueManager}
          onChange={(e) => setVenueManager(e.target.checked)}
          className="mr-2"
        />
        <span>Register as Venue Manager</span>
      </label>
      <button type="submit" className="rounded bg-blue-500 p-2 text-white">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
