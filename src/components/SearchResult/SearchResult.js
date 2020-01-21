import React from 'react';
import './SearchResult.css';

const SearchResult = (props) => {
  return (
    <li onClick={props.click} className="SearchResult px-3 py-2">{props.name}</li>
  )
}

export default SearchResult;