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
  metaData?: MetaData;
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
  metaData,
  isDetailed,
}) => {

  const mediaItem = media && media.length > 0 ? media[0] : null;

  return (
    <div className="relative flex h-96 w-72 flex-col items-center justify-center rounded-lg bg-primary text-secondary shadow-lg">
      { mediaItem ? (
        <img
          src={mediaItem.url}
          alt={mediaItem.alt}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      ): (
        <img 
          src= {Norway}
          alt="Missing image"
          className="w-full h-40 object-cover rounded-t-lg"
        />
      )}

      <div className="absolute top-0 right-0 p-2 bg-secondary text-primary rounded-bl-lg">

      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm">{description}</p>
        <p className="text-sm">
          {city}, {country}
        </p>
        <p className="text-sm">Price: ${price}</p>
        <p className="text-sm">Rating: {rating}</p>

        {isDetailed && metaData && (
          <>
            {metaData.wifi && <p>Gratis Wifi</p>}
            {metaData.parking && <p>Gratis parking</p>}
            {metaData.breakfast && <p>Breakfast included</p>}
            {metaData.pets && <p>Pets allowed</p>}
          </>
        )}
        {isDetailed && description && <p>{description}</p>}
      </div>
      <Link to={`/venue/${id}`}>View Venue</Link>
    </div>
  );
};

export default VenueCard;
