import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchVenueById, Venue } from '../../services/VenuesService';
import VenueCard from '../../components/VenueCard';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FcCalendar } from 'react-icons/fc';

const VenuePage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      setSelectedDate(date[0]);
    } else {
      setSelectedDate(date);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

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
    <div className="flex flex-wrap gap-4 p-4">
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
      <div
        className="Calendar-toggle Calendar-container flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-lg"
        onClick={toggleCalendar}
      >
        <span className="ml-2">Book your stay</span>
        <FcCalendar size={40} />

        {showCalendar && (
          <div className={showCalendar ? 'block' : 'hidden'}>
            <Calendar
              onChange={(value) => handleDateChange(value as Date | Date[])}
              value={selectedDate}
              selectRange={true}
              tileClassName={({ date }) => {
                if (date.getDay() === 0 || date.getDay() === 6) {
                  return 'bg-red-200';
                }
              }}
            />
            <button className="mt-4 w-full rounded bg-primary py-2 text-white">
              Book now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuePage;
