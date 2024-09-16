import React, { useEffect, useState } from 'react';
import { FetchVenues, Venue } from '../../services/VenuesService';
import VenueCard from '../../components/VenueCard';

const HomePage: React.FunctionComponent = (): JSX.Element => {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venues = await FetchVenues();
        setVenues(venues);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          id={venue.id}
          name={venue.name}
          description={venue.description}
          media={venue.media}
          city={venue.location.city}
          country={venue.location.country}
          price={venue.price}
          rating={venue.rating}
          metaData={venue.metaData}
        />
      ))}
    </div>
  );
};

export default HomePage;
