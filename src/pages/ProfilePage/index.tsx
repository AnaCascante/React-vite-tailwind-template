import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  meLocalStorage,
  removeLocalStorage,
} from '../../services/localStorage';
import VenueList from '../../components/VenueList';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
  _count?: {
    booking?: number;
    venue?: number;
  };
}

const ProfilePage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = meLocalStorage('user');
    const storedRole = meLocalStorage('role');
    const storedToken = meLocalStorage('token');

    if (!storedUser || !storedToken) {
      navigate('/login');
    } else {
      setUser(storedUser);
      setRole(storedRole || 'defaultRole');
    }
  }, [navigate]);

  if (!user || !role) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display the user's banner */}
      <img src={user.banner?.url} alt={user.banner?.alt} />

      {/* Display the user's avatar */}
      <img src={user.avatar?.url} alt={user.avatar?.alt} />

      <h1>Name: {user.name}</h1>
      <p>Email: {user.email}</p>

      {/* Button to become a venue manager */}
      {!user.venueManager && (
        <button onClick={() => navigate('/admin')}>
          Become a Venue Manager
        </button>
      )}

      {/* Display the user's booking and venue counts */}
      <p>Bookings: {user._count?.booking ?? 'No bookings'}</p>
      <p>Venues: {user._count?.venue ?? 'No venues'}</p>

      {/* Display the user's venues if they are a venue manager */}
      {user.venueManager && (
        <div>
          <h2>Your Venues</h2>
          <VenueList userId={user.id} venues={[]} />
          <button>Create New Venue</button>
        </div>
      )}

      {/* Logout button */}
      <button
        onClick={() => {
          removeLocalStorage('token');
          removeLocalStorage('role');
          removeLocalStorage('user');
          navigate('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
