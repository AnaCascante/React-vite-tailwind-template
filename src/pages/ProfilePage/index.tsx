import { useNavigate } from 'react-router-dom';
import { meLocalStorage } from '../../services/localStorage';

const ProfilePage: React.FC = () => {
  const token = meLocalStorage('accessToken');
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1>Welcome to your profile</h1>
      {/* Profile content here */}
    </div>
  );
};

export default ProfilePage;
