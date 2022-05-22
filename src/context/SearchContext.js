import { createContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchPage, setSearchPage] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        searchData,
        setSearchData,
        searchText,
        setSearchText,
        searchPage,
        setSearchPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
