import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import ColorSchemeToggler from './ColorSchemeToggler';
import DropdownMenu from './DropdownMenu';
import MenuButton from '../MenuButton';
import Spinner from '../Spinner';

function Navbar() {
  const { loggedIn, loading, setLoggedIn } = useAuthStatus();
  const navigate = useNavigate();
  const auth = getAuth();
  const onLogout = () => {
    if (!loggedIn) {
      return toast.info('You are not logged in currently');
    }
    auth.signOut();
    toast.info('You have been logged out');
    setLoggedIn(false);
    navigate('/');
  };

  return loading ? (
    <Spinner />
  ) : (
    <nav className='bg-primary text-neutral-content bg-opacity-80 flex justify-center z-50'>
      <div className='navbar lg:w-4/5'>
        <div className='flex-none'></div>
        <DropdownMenu>
          <MenuButton to='/' text='Home' />
          {loggedIn ? (
            <button
              onClick={onLogout}
              className='btn btn-ghost normal-case text-lg flex gap-2'
            >
              Log Out
            </button>
          ) : (
            <>
              <MenuButton to='/sign-up' text='Sign Up' />
              <MenuButton to='/sign-in' text='Sign In' />
            </>
          )}
        </DropdownMenu>
        <div className='hidden lg:flex gap-5'>
          <MenuButton to='/' text='Home' />
        </div>
        <div className='ml-auto'>
          <div className='hidden lg:flex gap-5'>
            {loggedIn ? (
              <button
                onClick={onLogout}
                className='btn btn-ghost normal-case text-lg flex gap-2'
              >
                Log Out
              </button>
            ) : (
              <>
                <MenuButton to='/sign-up' text='Sign Up' />
                <MenuButton to='/sign-in' text='Sign In' />
              </>
            )}
          </div>
          <ColorSchemeToggler />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
