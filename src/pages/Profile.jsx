import { getAuth } from 'firebase/auth';
import { useAuthStatus } from '../hooks/useAuthStatus';

function Profile() {
  const auth = getAuth();
  const { loggedIn, loading, setLoggedIn, username } = useAuthStatus();

  return (
    <>
      <h1 className='text-3xl text-center'>
        Welcome to Your profile page <strong>{username}</strong>!
      </h1>
      <h2 className='text-2xl text-center mt-3'>Your favourite books:</h2>
    </>
  );
}
export default Profile;
