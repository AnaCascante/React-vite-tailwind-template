import { Link } from 'react-router-dom';
import { MetaData } from '../../services/VenuesService';
import { Media } from '../../services/VenuesService';
import Norway from '../../assets/Norway.png';

interface VenueCardProps {
  id: string;
  name: string;
  description?: string;
  media: Media[];
  city: string;
  country: string;
  price: number;
  rating: number;
  meta?: MetaData;
  isDetailed?: boolean;
}

const VenueCard: React.FC<VenueCardProps> = ({
  id,
  name,
  description,
  media,
  city,
  country,
  price,
  rating,
  meta,
  isDetailed,
}) => {
  console.log('Meta Data:', meta);
  console.log('isDetailed:', isDetailed);
  const mediaItem = media && media.length > 0 ? media[0] : null;

  return (
    <div className="relative flex h-full w-full max-w-full flex-col items-center justify-center rounded-lg bg-primary p-4 pt-2 text-secondary shadow-lg md:p-8 md:pt-2 lg:p-12 lg:pt-2">
      {mediaItem ? (
        <img
          src={mediaItem.url}
          alt={mediaItem.alt}
          className="mb-4 h-auto w-full rounded-t-lg object-cover"
        />
      ) : (
        <img
          src={Norway}
          alt="Missing image"
          className="h-40 w-full rounded-t-lg object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>
        {isDetailed && description && (
          <p>{description || 'No description available'}</p>
        )}
        <p className="text-sm">
          {city || 'Not specified'}, {country || 'Not specified'}
        </p>
        <p className="text-sm">Price: ${price}</p>
        <p className="text-sm">Rating: {rating}</p>

        {isDetailed && meta && (
          <>
            {meta.wifi && <p>Gratis Wifi</p>}
            {meta.parking && <p>Gratis parking</p>}
            {meta.breakfast && <p>Breakfast included</p>}
            {meta.pets && <p>Pets allowed</p>}
          </>
        )}
      </div>
      <>
        {isDetailed ? (
          <label className="absolute bottom-4 right-4 rounded-lg bg-secondary p-2 text-primary">
            Number of Guests: <input type="number" min="1" max="10" />
          </label>
        ) : (
          <Link to={`/venue/${id}`}>View Venue</Link>
        )}
      </>
    </div>
  );
};

export default VenueCard;
