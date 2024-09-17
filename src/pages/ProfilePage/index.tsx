import React from 'react';
import { meLocalStorage } from '../../services/localStorage';

const ProfilePage: React.FC = () => {
  const token = meLocalStorage('accessToken');

  if (!token) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div>
      <h1>Welcome to your profile</h1>
      {/* Profile content here */}
    </div>
  );
};

export default ProfilePage;
