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
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
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
      <div
        className={`Calendar-toggle Calendar-container flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-lg transition-all duration-300 ${
          showCalendar
            ? 'mt-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'
            : 'w-auto'
        }`}
        onClick={toggleCalendar}
      >
        <span className="ml-2 text-lg font-bold text-primary underline">
          Book your stay
        </span>
        <FcCalendar size={50} />

        {showCalendar && (
          <div className="mt-4 block w-full">
            <div className="overflow-hidden rounded-lg">
              <Calendar
                onChange={(value) => handleDateChange(value as Date | Date[])}
                value={selectedDate}
                selectRange={true}
                tileClassName={({ date }) => {
                  if (date.getDay() === 0 || date.getDay() === 6) {
                    return 'bg-red-200';
                  }
                }}
                className="w-full"
              />
            </div>
            <button className="mx-auto mt-4 flex items-center justify-center rounded bg-primary p-4 py-2 text-lg font-bold text-secondary">
              Book now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuePage;
