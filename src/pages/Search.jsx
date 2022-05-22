import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import SearchContext from '../context/SearchContext';
import Spinner from '../components/Spinner';

function Search() {
  const { setSearchData, searchData, setSearchText, setSearchPage } =
    useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [languages, setLanguages] = useState([]);
  const [topic, setTopic] = useState('');
  const [copyright, setCopyright] = useState({
    copyrighted: false,
    notCopyrighted: false,
    unknown: false,
  });
  const [authorsBirthMax, setAuthorsBirthMax] = useState('');
  const [authorsDeathMax, setAuthorsDeathMax] = useState('');

  const API_URL = 'https://gutendex.com/books/?search=';

  const navigate = useNavigate();

  useEffect(() => {
    if (searchData.results && searchData.results.length > 0)
      navigate('/results');
  });

  // fetch books from api

  const onSubmit = async (e) => {
    e.preventDefault();
    if (search.length < 3)
      return toast.info('You must enter at least 3 characters');

    let query = search;

    //  add copyright info to query
    if (
      copyright.copyrighted ||
      copyright.notCopyrighted ||
      copyright.unknown
    ) {
      query += '&copyright=';
      if (copyright.copyrighted) query += 'true,';
      if (copyright.notCopyrighted) query += 'false,';
      if (copyright.unknown) query += 'null';
    }

    //  add topic to query

    if (topic.length > 1) query += '&topic=' + topic;

    //  add authors death/birth year

    if (authorsBirthMax.length > 0)
      query += '&author_year_start=' + authorsBirthMax;
    if (authorsDeathMax.length > 0)
      query += '&author_year_end=' + authorsDeathMax;

    //  add languages

    if (languages.length > 0)
      query +=
        '&languages=' + languages.reduce((acc, curr) => acc + ',' + curr);

    try {
      setIsLoading(true);
      const res = await axios.get(API_URL + query);

      if (res.data.results.length < 1) toast.info('No results found');

      //  update context

      setSearchText(search);
      setSearchData(res.data);
      setSearchPage(1);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleLanguageChange = (e) => {
    if (e.target.checked) {
      if (languages.includes(e.target.value)) return;
      setLanguages([...languages, e.target.value]);
    }
    if (!e.target.checked)
      setLanguages(languages.filter((el) => el !== e.target.value));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <header>
        <h1 className='text-4xl text-center mt-16 mb-6'>Search for Books</h1>
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
            <div className='flex flex-wrap w-full xl:w-3/5 2xl:w-2/5 mx-auto grid sm:grid-cols-2 mt-6'>
              <article className='collapse collapse-arrow mx-auto w-60 mt-2'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>
                  Languages
                </div>
                <div className='collapse-content'>
                  <div className='form-control'>
                    <label className='label cursor-pointer'>
                      <span className='label-text'>English</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={handleLanguageChange}
                        value='en'
                        checked={languages.includes('en')}
                      />
                    </label>
                    <label className='label cursor-pointer'>
                      <span className='label-text'>Finnish</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={handleLanguageChange}
                        value='fi'
                        checked={languages.includes('fi')}
                      />
                    </label>
                    <label className='label cursor-pointer'>
                      <span className='label-text'>French</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={handleLanguageChange}
                        value='fr'
                        checked={languages.includes('fr')}
                      />
                    </label>

                    <label className='label cursor-pointer'>
                      <span className='label-text'>German</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={handleLanguageChange}
                        value='de'
                        checked={languages.includes('de')}
                      />
                    </label>
                    <label className='label cursor-pointer'>
                      <span className='label-text'>Polish</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={handleLanguageChange}
                        value='pl'
                        checked={languages.includes('pl')}
                      />
                    </label>
                    <label className='label cursor-pointer'>
                      <span className='label-text'>Spanish</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={handleLanguageChange}
                        value='es'
                        checked={languages.includes('es')}
                      />
                    </label>
                  </div>
                </div>
              </article>

              <article className='collapse collapse-arrow mx-auto w-60 mt-2'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>
                  Copyright
                </div>
                <div className='collapse-content'>
                  <div className='form-control'>
                    <label className='label cursor-pointer'>
                      <span className='label-text'>Copyrighted</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={() =>
                          setCopyright({
                            ...copyright,
                            copyrighted: !copyright.copyrighted,
                          })
                        }
                        checked={copyright.copyrighted}
                      />
                    </label>
                    <label className='label cursor-pointer'>
                      <span className='label-text'>Not copyrighted</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={() =>
                          setCopyright({
                            ...copyright,
                            notCopyrighted: !copyright.notCopyrighted,
                          })
                        }
                        checked={copyright.notCopyrighted}
                      />
                    </label>
                    <label className='label cursor-pointer'>
                      <span className='label-text'>Unknown</span>
                      <input
                        type='checkbox'
                        className='checkbox'
                        onChange={() =>
                          setCopyright({
                            ...copyright,
                            unknown: !copyright.unknown,
                          })
                        }
                        checked={copyright.unknown}
                      />
                    </label>
                  </div>
                </div>
              </article>
              <article className='collapse collapse-arrow mx-auto mt-2 w-60'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>
                  Author years range
                </div>
                <div className='collapse-content'>
                  <div className='input-group mt-2'>
                    <input
                      type='number'
                      placeholder='Birth'
                      className='input input-bordered w-full max-w-lg'
                      onChange={(e) => setAuthorsBirthMax(e.target.value)}
                      value={authorsBirthMax}
                    />
                    <input
                      type='number'
                      placeholder='Death'
                      className='input input-bordered w-full max-w-lg'
                      onChange={(e) => setAuthorsDeathMax(e.target.value)}
                      value={authorsDeathMax}
                    />
                  </div>
                </div>
              </article>
              <article className='collapse collapse-arrow mx-auto mt-2 w-60'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>Topic</div>
                <div className='collapse-content pt-2'>
                  <input
                    type='text'
                    placeholder='Book topic...'
                    className='input input-bordered w-40'
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                    }}
                  />
                </div>
              </article>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Search;
