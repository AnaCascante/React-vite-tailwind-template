export const BaseUrl = 'https://v2.api.noroff.dev';

export const ApiUrls = {
  Login: `${BaseUrl}/auth/login`,
  Register: `${BaseUrl}/auth/register`,
  Venues: `${BaseUrl}/holidaze/venues`,
  Bookings: `${BaseUrl}/holidaze/bookings`,
  Users: `${BaseUrl}/holidaze/profiles`,
  Me: `${BaseUrl}/me`,

  Venue: (id: string) => `${BaseUrl}/holidaze/venues/${id}`,
  Booking: (id: string) => `${BaseUrl}/holidaze/bookings/${id}`,
  User: (id: string) => `${BaseUrl}/holidaze/profile/${id}`,
  UserBookings: (name: string) =>
    `${BaseUrl}/holidaze/profile/${name}/bookings`,
  UserVenues: (name: string) => `${BaseUrl}/holidaze/profile/${name}/venues`,
  VenueBookings: (id: string) => `${BaseUrl}/holidaze/venues/${id}/bookings`,
};
