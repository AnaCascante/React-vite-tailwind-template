import { ApiUrls, BaseUrl } from './ApiUrl';
import { API_KEY } from './Registration';
// import { QueryBooking, QueryCustomer, QueryOwner } from './Queries';

export interface BookingData {
  venueId?: string;
  datoFrom: string;
  datoTo: string;
  guests: number;
  created?: string;
  updated?: string;
}

export interface BookingQuery {
  _customer?: boolean;
  _venue?: boolean;
  datoFrom?: string;
  datoTo?: string;
  guests?: number;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

// Function to fetch bookings on BookingData

export const BookVenue = async (booking: BookingData): Promise<BookingData> => {
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
      throw Error('Failed to book venue');
    }
    return await response.json();
  } catch (error) {
    console.error('Error booking venue:', error);
    throw error;
  }
};

// Function to create a booking

export const createBooking = async (
  booking: BookingData
): Promise<BookingData> => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(ApiUrls.Bookings, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Error create booking:', error);
    throw error;
  }
};

// Function to fetch bookings on query parameters

/*export const BookingByQuery = async (
  query: BookingQuery,
  type: 'customer' | 'venue'
): Promise<BookingData[]> => {
  const token = localStorage.getItem('token');
  const queryString: any = {
    _customer: query._customer ? 'true' : undefined,
    _venue: query._venue ? 'true' : undefined,
    datoFrom: query.datoFrom ? query.datoFrom : undefined,
    datoTo: query.datoTo ? query.datoTo.toISOSting() : undefined,
    guests: query.guests ? query.guests.toISOString() : undefined,
    status: query.status ? query.status : undefined,
  };

  const filteredQueryString = Object.entries(queryString).filter(
    ([, value]) => value !== undefined
  );
  const queryParams = new URLSearchParams(
    filteredQueryString as Record<string, string>
  );

  const selectQuery = type === 'profile'
  ? `{
    bookings ${QueryBooking} 
    venue ${QueryVenue}
    }`
    : `{bookings ${QueryBooking}
       owner ${QueryOwner}}`;


  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch bookings by query');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching bookings by query:', error);
    throw error;
  }
};



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

// Function to delete a booking

export const DeleteBooking = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(ApiUrls.Booking(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete booking');
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
}; */
