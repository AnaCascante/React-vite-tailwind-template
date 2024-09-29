//import { ApiUrls, BaseUrl } from './ApiUrl';
import { ApiUrls } from './ApiUrl';
import { API_KEY } from './Registration';
import { Location, Media, MetaData } from './VenuesService';
// import { QueryBooking, QueryCustomer, QueryOwner } from './Queries';

export interface BookingData {
  id?: string;
  venueId?: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created?: string;
  updated?: string;
}

export interface VenueData {
  id?: string;
  name: string;
  description: string;
  media?: Media;
  price: number;
  maxGuests: number;
  rating?: number;
  created?: string;
  updated?: string;
  meta?: MetaData;
  location?: Location;
  owner?: {
    name: string;
    email: string;
  };
}

export interface BookingQuery {
  _customer?: boolean;
  _venue?: boolean;
  datoFrom?: string;
  datoTo?: string;
  guests?: number;
  status?: 'pending' | 'confirmed' | 'cancelled';
}


interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

interface UserProfile {
  bio?: string;
  avatar?: Avatar;
  banner?: Banner;
  venueManager?: boolean;
}

export const updateVenue = async (venueId: string, venueDetails: VenueData) => {
  // Filtrar los campos vacíos
  const updatedVenue = {
    name: venueDetails.name,
    price: Number(venueDetails.price),
    description: venueDetails.description,
    maxGuests: Number(venueDetails.maxGuests),
  }
  console.log("🚀 ~ updateVenue ~ updatedVenue:", updatedVenue)

  try {
    const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(updatedVenue), // Enviar solo los campos no vacíos
    });

    if (!response.ok) {
      throw new Error('Error updating venue');
    }

    window.location.reload(); // Recargar la página si la actualización fue exitosa
    return true; // Indica que la actualización fue exitosa
  } catch (error) {
    console.error('Failed to update venue:', error);
    throw error; // Propaga el error para que pueda ser manejado en el componente
  }
};

export const updateUserProfile = async (
  name: string,
  profile: UserProfile,
) => {
  console.log("🚀 ~ profile:", profile)
  // Filtrar los campos vacíos
  const updatedProfile = {
    bio: profile.bio || undefined,
    avatar: {
      url: profile.avatar?.url || undefined,
      alt: profile.avatar?.alt || undefined,
    },
    banner: {
      url: profile.banner?.url || undefined,
      alt: profile.banner?.alt || undefined,
    },
    venueManager: profile.venueManager,
  };

  // Eliminar propiedades con valor undefined
  const filteredProfile = Object.fromEntries(
    Object.entries(updatedProfile).filter(([_, v]) => v !== undefined)
  );

  try {
    const response = await fetch(ApiUrls.User(name), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(filteredProfile), // Enviar solo los campos no vacíos
    });

    if (!response.ok) {
      throw new Error('Error updating profile');
    }

    return true; // Indica que la actualización fue exitosa
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error; // Propaga el error para que pueda ser manejado en el componente
  }
};

// Function to fetch bookings on BookingData

export const BookVenue = async (booking: BookingData): Promise<any> => {
  const token = localStorage.getItem('token');
  const id = booking.venueId; // Assuming venueId is the id needed
  if (!id) {
    throw new Error('venueId is required');
  }
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/bookings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify(booking),
      }
    );
    console.log('apikey', API_KEY);
    console.log('response status:', response.status);
    const responseBody = await response.json();
    console.log('response body:', responseBody);

    if (!response.ok) {
      console.error('Response not ok:', responseBody);
      return {
        success: false,
        response: null,
        error: responseBody?.errors[0]?.message,
      };
    }
    return {
      success: true,
      response: responseBody,
      error: null,
    };
  } catch (error) {
    console.error('Error booking venue:', error);
  }
};

// Function to create a booking

export const createVenue = async (venue: VenueData): Promise<void> => {
  // Obtener el token y verificar si está disponible
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Error: No authentication token found.');
    throw new Error('No authentication token found. Please log in again.');
  }

  // Convertir precios y maxGuests a números
  venue.price = Number(venue.price);
  venue.maxGuests = Number(venue.maxGuests);

  try {
    const response = await fetch(ApiUrls.Venues, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(venue),
    });

    // Manejo de la respuesta
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(
        `Failed to create venue: ${errorResponse.message || 'Unknown error'}`
      );
    }

    // Aquí esperamos el objeto de respuesta que contiene el ID
    const { data } = await response.json();

    // Redirigir al usuario a la página del nuevo venue usando su ID
    window.location.href = `/venue/${data.id}`;
  } catch (error: any) {
    console.error('Error creating venue:', error);
    throw new Error(
      `An error occurred while creating the venue: ${error.message || 'Unknown error'}`
    );
  }
};

export const BookingByProfile = async (
  name: string
): Promise<BookingData[]> => {
  const token = localStorage.getItem('token');

  // Check if the token is present
  if (!token) {
    console.error('Error: No authentication token found.');
    throw new Error('No authentication token found. Please log in again.');
  }

  try {
    const response = await fetch(ApiUrls.UserBookings(name), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    // Handle response errors
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(
        `Failed to fetch bookings for profile "${name}": ${errorResponse.message || 'Unknown error'}`
      );
    }

    // Parse and return bookings data
    const data = await response.json();
    console.log('🚀 ~ data:', data);
    return data.data; // Return the array of bookings
  } catch (error: any) {
    console.error('Error fetching bookings by profile:', error);
    throw new Error(
      `An error occurred while fetching bookings for profile "${name}": ${error.message || 'Unknown error'}`
    );
  }
};

export const DeleteBooking = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');

  // Check if the token is present
  if (!token) {
    console.error('Error: No authentication token found.');
    throw new Error('No authentication token found. Please log in again.');
  }

  try {
    const response = await fetch(ApiUrls.Booking(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    // Handle response errors
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(
        `Failed to delete booking with ID "${id}": ${errorResponse.message || 'Unknown error'}`
      );
    }

    // reload the pasge
    window.location.reload();
  } catch (error: any) {
    console.error('Error deleting booking:', error);
    throw new Error(
      `An error occurred while deleting booking with ID "${id}": ${error?.message || 'Unknown error'}`
    );
  }
};

// Fetch venues by user profile
export const VenueByProfile = async (name: string): Promise<VenueData[]> => {
  const token = localStorage.getItem('token');

  // Check if the token is present
  if (!token) {
    console.error('Error: No authentication token found.');
    throw new Error('No authentication token found. Please log in again.');
  }

  try {
    const response = await fetch(ApiUrls.UserVenues(name), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    // Handle response errors
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(
        `Failed to fetch venues for profile "${name}": ${errorResponse.message || 'Unknown error'}`
      );
    }

    // Parse and return venues data
    const data = await response.json();
    return data.data; // Return the array of venues
  } catch (error: any) {
    console.error('Error fetching venues by profile:', error);
    throw new Error(
      `An error occurred while fetching venues for profile "${name}": ${error.message || 'Unknown error'}`
    );
  }
};

// Delete venue
export const DeleteVenue = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');

  // Check if the token is present
  if (!token) {
    console.error('Error: No authentication token found.');
    throw new Error('No authentication token found. Please log in again.');
  }

  try {
    const response = await fetch(ApiUrls.Venue(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    // Handle response errors
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(
        `Failed to delete venue with ID "${id}": ${errorResponse.message || 'Unknown error'}`
      );
    }

    // reload the page or manage state
    window.location.reload();
  } catch (error: any) {
    console.error('Error deleting venue:', error);
    throw new Error(
      `An error occurred while deleting venue with ID "${id}": ${error?.message || 'Unknown error'}`
    );
  }
};

/**/

// Function to fetch bookings on query parameters

/*



// Function to update a booking

export const updateBooking = async (
  id: string,
  booking: Partial<BookingData>
): Promise<BookingData> => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(ApiUrls.Booking(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      throw new Error('Failed to update booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Error update booking:', error);
    throw error;
  }
};

*/
