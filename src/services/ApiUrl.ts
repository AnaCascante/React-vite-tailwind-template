export const BaseUrl = 'https://v2.api.noroff.dev';

export const ApiUrls = {
  Login: `${BaseUrl}/auth/login`,
  Register: `${BaseUrl}/auth/register`,
  Venues: `${BaseUrl}/venues`,
  Bookings: `${BaseUrl}/bookings`,
  Users: `${BaseUrl}/profiles`,
  Me: `${BaseUrl}/me`,

  Venue: (id: string) => `${BaseUrl}/venues/${id}`,
  Booking: (id: string) => `${BaseUrl}/bookings/${id}`,
  User: (id: string) => `${BaseUrl}/users/${id}`,
  UserBookings: (id: string) => `${BaseUrl}/users/${id}/bookings`,
  UserVenues: (id: string) => `${BaseUrl}/users/${id}/venues`,
  VenueBookings: (id: string) => `${BaseUrl}/venues/${id}/bookings`,
};
