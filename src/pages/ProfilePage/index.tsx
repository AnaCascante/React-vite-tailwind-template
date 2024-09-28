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
  banner: string;
  avatar: string;
  venueManager: boolean;
  _count: {
    booking: number;
    venue: number;
  };
}

const ProfilePage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = meLocalStorage('user');
    const storedRole = meLocalStorage('role');

    console.log('storedRole', storedRole);
    console.log('storedUser', storedUser);
  }, [navigate]);

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={user?.banner} alt="Profile Banner" />
      <img src={user?.avatar} alt="Profile Avatar" />

      <h1>Name: {user?.name}</h1>
      <p>Email: {user?.email}</p>

      {!user?.venueManager && (
        <button onClick={() => navigate('/admin')}>
          Become a Venue Manager
        </button>
      )}

      <p>Bookings: {user?._count.booking}</p>
      <p>Venues: {user?._count.venue}</p>

      {user?.venueManager && (
        <div>
          <h2>Your Venues</h2>
          <VenueList userId={user.id} venues={[]} />
          <button>Create New Venue</button>
        </div>
      )}

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
