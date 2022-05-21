import { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';
import { setTheme, saveTheme } from '../../utils/theme';

function ColorSchemeToggler() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    saveTheme();
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      setDarkMode(true);
    }
  }, []);

  const onClick = () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      setTheme('light');
      setDarkMode(false);
    } else {
      setTheme('dark');
      setDarkMode(true);
    }
  };

  return (
    <button
      className='btn btn-ghost'
      onClick={onClick}
      aria-label='toggle color scheme'
    >
      {darkMode ? (
        <BsSunFill className='w-5 h-5' />
      ) : (
        <FaMoon className='w-4 h-4' />
      )}
    </button>
  );
}
export default ColorSchemeToggler;
