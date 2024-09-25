import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchVenueById, Venue } from '../../services/VenuesService';
import VenueCard from '../../components/VenueCard';

const VenuePage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
    const getVenue = async () => {
      try {
        const fetchedVenue = await FetchVenueById(id);
        setVenue(fetchedVenue);
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
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <VenueCard
        key={venue.id}
        id={venue.id}
        name={venue.name}
        media={venue.media}
        city={venue.location.city}
        country={venue.location.country}
        price={venue.price}
        rating={venue.rating}
        isDetailed={true}
      />
    </div>
  );
};

export default VenuePage;
