import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import { FaArrowLeft } from 'react-icons/fa';

function SearchResults() {
  const { searchText, searchData, setSearchData, setSearchText } =
    useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchData || searchData.length === 0) navigate('/');
  }, [navigate, searchData]);

  const onClickBack = () => {
    setSearchData([]);
    setSearchText('');
    navigate('/');
  };

  return (
    searchData && (
      <section className='w-4/5'>
        <h2 className='text-center text-xl -mt-10 mb-6'>
          {searchData.length > 0
            ? searchData.length +
              ` Book${searchData.length === 1 ? '' : 's'} found`
            : 'No Books found'}
        </h2>

        <button
          onClick={onClickBack}
          className='btn btn-outline btn-sm flex gap-2 mb-7 mx-auto'
        >
          <FaArrowLeft /> Search Again
        </button>

        <div className='grid xl:grid-cols-2 gap-x-8 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-full 2xl:w-3/4 3xl:w-2/3 justify-center mx-auto'></div>
      </section>
    )
  );
}
export default SearchResults;
