import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchVenueById, Venue } from '../../services/VenuesService';

const VenuePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
    const getVenue = async () => {
      try {
        const venue = await FetchVenueById(id);
        setVenue(venue);
      } catch (error) {
        console.error(error);
      }
    };
    getVenue();
  }, [id]);

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">{venue.name}</h1>
      <img
        src={venue.media[0].url}
        alt={venue.media[0].alt}
        className="h-96 w-96"
      />
      <p className="text-lg">{venue.description}</p>
      <p className="text-lg">
        {venue.location.city}, {venue.location.country}
      </p>
      <p className="text-lg">Price: ${venue.price}</p>
      <p className="text-lg">Rating: {venue.rating}</p>
    </div>
  );
};

export default VenuePage;
