import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  meLocalStorage,
  removeLocalStorage,
} from '../../services/localStorage';
import VenueList from '../../components/VenueList';
import CreateVenue from '../../components/CreateVenue'; // Importar el componente

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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCreatingVenue, setIsCreatingVenue] = useState(false); // Estado para alternar entre crear o ver venues
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = meLocalStorage('user');
    const storedToken = meLocalStorage('token');

    if (!storedUser || !storedToken) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const becomeVenueManager = () => {
    if (!user) {
      return;
    }

    setUser((prevUser) => {
      if (!prevUser) {
        return prevUser;
      }

      return {
        ...prevUser,
        venueManager: true,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div
        className="relative h-48 bg-cover bg-center sm:h-64 md:h-72 lg:h-80"
        style={{
          backgroundImage: `url(${user.banner?.url || 'https://via.placeholder.com/150'})`,
        }}
      >
        {/* Avatar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
          <img
            src={user.avatar?.url || 'https://via.placeholder.com/100'}
            alt={user.avatar?.alt || 'User Avatar'}
            className="h-24 w-24 rounded-full border-4 border-white shadow-lg sm:h-32 sm:w-32 md:h-40 md:w-40"
          />
        </div>
      </div>

      {/* User Info Section */}
      <div className="mt-16 px-4 text-center md:mt-24">
        <h1 className="text-2xl font-semibold">{user.name || 'Username'}</h1>
        <p className="text-gray-600">{user.email || 'user@example.com'}</p>

        {/* Venue Manager Button */}
        {!user.venueManager && (
          <button
            onClick={becomeVenueManager}
            className="mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500"
          >
            Become a Venue Manager
          </button>
        )}

        {/* Booking and Venue Counts */}
        <div className="mt-4">
          <p className="text-lg">
            Bookings: {user._count?.booking ?? 'No bookings'}
          </p>
          <p className="text-lg">Venues: {user._count?.venue ?? 'No venues'}</p>
        </div>

        {/* Venues List if Venue Manager */}
        {user.venueManager && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">
              {isCreatingVenue ? 'Create a New Venue' : 'Your Venues'}
            </h2>

            {/* Mostrar el formulario para crear un venue */}
            {isCreatingVenue ? (
              <CreateVenue />
            ) : (
              <>
                <VenueList userId={user.id} venues={[]} />

                <button
                  onClick={() => setIsCreatingVenue(true)} // Cambiar a modo crear venue
                  className="mt-4 rounded bg-green-600 px-6 py-2 text-white hover:bg-green-500"
                >
                  Create New Venue
                </button>
              </>
            )}
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={() => {
            removeLocalStorage('token');
            removeLocalStorage('role');
            removeLocalStorage('user');
            navigate('/login');
          }}
          className="mb-4 mt-8 rounded bg-red-600 px-6 py-2 text-white hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
