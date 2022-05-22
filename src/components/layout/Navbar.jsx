import { useNavigate, useEffect } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import ColorSchemeToggler from './ColorSchemeToggler';
import DropdownMenu from './DropdownMenu';
import MenuButton from '../MenuButton';
import Spinner from '../Spinner';

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { loggedIn, loading, setLoggedIn } = useAuthStatus();

  const onLogout = async () => {
    if (!loggedIn) {
      return toast.info('You are currently not logged in');
    }
    await auth.signOut();
    toast.info('You have been logged out');
    setLoggedIn(false);
    navigate('/');
  };

  return loading ? (
    <Spinner />
  ) : (
    <nav className='bg-primary text-neutral-content bg-opacity-80 fixed w-full flex justify-center z-50'>
      <div className='navbar lg:w-4/5'>
        <div className='flex-none'></div>
        <DropdownMenu>
          <MenuButton to='/' text='Search' />
          {loggedIn ? (
            <>
              <MenuButton to='/profile' text='Profile' />
              <button
                onClick={onLogout}
                className='btn btn-ghost normal-case text-lg flex gap-2'
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <MenuButton to='/sign-in' text='Sign In' />
              <MenuButton to='/sign-up' text='Sign Up' />
            </>
          )}
        </DropdownMenu>
        <div className='hidden lg:flex gap-5'>
          <MenuButton to='/' text='Search' />
        </div>
        <div className='ml-auto'>
          <div className='hidden lg:flex gap-5'>
            {loggedIn ? (
              <>
                <MenuButton to='/profile' text='Profile' />
                <button
                  onClick={onLogout}
                  className='btn btn-ghost normal-case text-lg flex gap-2'
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <MenuButton to='/sign-in' text='Sign In' />
                <MenuButton to='/sign-up' text='Sign Up' />
              </>
            )}
          </div>
          <div className='ml-5'>
            <ColorSchemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
