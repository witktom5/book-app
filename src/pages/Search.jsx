import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const API_URL = 'https://gutendex.com/books/?';

  const navigate = useNavigate();

  // fetch books from api

  const onSubmit = async (e) => {
    e.preventDefault();
    if (search.length < 3)
      return toast.info('You must enter at least 3 characters');
    try {
      setIsLoading(true);
      console.log(isLoading);
      const res = await axios.get(`${API_URL}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <header>
        <h1 className='text-4xl text-center mt-16'>Search for Books</h1>
      </header>
      <div>
        <form onSubmit={onSubmit}>
          <div className='form-control'>
            <div className='input-group justify-center mt-7'>
              <input
                type='text'
                placeholder='Search...'
                className='input input-bordered w-full max-w-lg'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                type='submit'
                className='btn btn-square btn-primary'
                aria-label='search'
              >
                <FaSearch className='w-5 h-5' />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Search;
