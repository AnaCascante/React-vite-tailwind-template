import { Link } from 'react-router-dom';
import { MetaData } from '../../services/VenuesService';
import { Media } from '../../services/VenuesService';

interface VenueCardProps {
  id: string;
  name: string;
  description: string;
  media: Media[];
  city: string;
  country: string;
  price: number;
  rating: number;
  metaData: MetaData;
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
}) => {
  return (
    <Link
      to={`/venue/${id}`}
      className="relative flex h-96 w-72 flex-col items-center justify-center rounded-lg bg-primary text-secondary shadow-lg"
    >
      <img
        src={media[0].url}
        alt={media[0].alt}
        className="h-52 w-full rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm">{description}</p>
        <p className="text-sm">
          {city}, {country}
        </p>
        <p className="text-sm">Price: ${price}</p>
        <p className="text-sm">Rating: {rating}</p>
      </div>
    </Link>
  );
};

export default VenueCard;
