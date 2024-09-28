import { ApiUrls } from './ApiUrl';

export interface BookingData {
  id?: string;
  datoFrom: string;
  datoTo: string;
  guests: number;
  created?: string;
  updated?: string;
}

export interface BookingQuery {
  _customer?: boolean;
  _venue?: boolean;
}

// Function to fetch bookings on BookingData

export const BookVenue = async (booking: BookingData): Promise<BookingData> => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(ApiUrls.Bookings, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      throw new Error('Failed to book venue');
    }
    return await response.json();
  } catch (error) {
    console.error('Error booking venue:', error);
    throw error;
  }
};

// Function to fetch bookings on query parameters

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
      },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      throw new Error('Failed to delete booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting booking:', error);
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
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete booking');
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};
