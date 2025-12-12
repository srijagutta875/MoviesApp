import React from 'react'

const SearchContext = React.createContext({
  searchText: '',
  setSearchText: () => {},
})
export default SearchContext
