import React, { useState, useEffect } from 'react';
import './AutocompleteSearch.css';

const AutocompleteSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, posts]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (title) => {
    setInputValue(title);
    setFilteredPosts([]);
  };

  return (
    <div className="autocomplete-container">
      <input
        className="autocomplete-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {inputValue && filteredPosts.length > 0 && (
        <ul className="autocomplete-list">
          {filteredPosts.map((post) => (
            <li key={post.id} onClick={() => handleItemClick(post.title)} className="autocomplete-item">
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;

