import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  return <div className='profile'></div>;
}
export default Profile;
