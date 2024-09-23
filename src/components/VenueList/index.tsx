interface Venue {
  id: number;
  name: string;
  location: string;
  description: string;
}

interface VenueListProps {
  venues: Venue[];
}

const VenueList: React.FC<VenueListProps> = ({ venues }) => {
  return (
    <div>
      <h2>Venue List</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <h3>{venue.name}</h3>
            <p>{venue.location}</p>
            <p>{venue.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueList;
