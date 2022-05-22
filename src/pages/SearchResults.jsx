import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchContext from '../context/SearchContext';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import SearchResult from '../components/SearchResult';

function SearchResults() {
  const {
    searchText,
    searchData,
    setSearchData,
    setSearchText,
    searchPage,
    setSearchPage,
  } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchData || searchData.length === 0) navigate('/');
    console.log(searchData);
  }, [navigate, searchData]);

  const onClickBack = () => {
    setSearchData([]);
    setSearchText('');
    navigate('/');
  };

  const onPreviousPageClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(searchData.previous);
      setSearchData(res.data);
      setSearchPage(searchPage - 1);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  const onNextPageClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(searchData.next);
      setSearchData(res.data);
      setSearchPage(searchPage + 1);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    searchData && (
      <>
        <header>
          <h1 className='text-4xl text-center mt-8 mb-2'>
            Search: <span className='text-slate-600'>{searchText}</span>
          </h1>
        </header>
        <h2 className='text-center text-xl mb-6'>
          {searchData.count > 0
            ? searchData.count +
              ` Book${searchData.count === 1 ? '' : 's'} found`
            : 'No Books found'}
        </h2>

        <section className='my-20 grid md:grid-cols-2 gap-5 lg:grid-cols-3 mx-auto'>
          {searchData.results.map((result, i) => (
            <SearchResult
              key={i}
              title={result.title}
              authors={result.authors}
              languages={result.languages}
              subjects={result.subjects}
              copyright={result.copyright}
              bookshelves={result.bookshelves}
            />
          ))}
        </section>

        <button
          onClick={onClickBack}
          className='btn btn-outline btn-sm flex gap-2 mb-7 mx-auto'
        >
          <FaArrowLeft /> Search Again
        </button>

        <div className='btn-group mt-auto'>
          <button
            onClick={onPreviousPageClick}
            className={`btn ml-auto ${
              !searchData.previous ? 'btn-disabled' : ''
            }`}
          >
            «
          </button>
          <button className='btn btn-disabled bg-neutral text-neutral-content'>
            Page {searchPage}
          </button>
          <button
            onClick={onNextPageClick}
            className={`btn mr-auto ${!searchData.next ? 'btn-disabled' : ''}`}
          >
            »
          </button>
        </div>
      </>
    )
  );
}
export default SearchResults;
