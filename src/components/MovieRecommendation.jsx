import React, { useState, useEffect } from 'react';
import axios from 'axios';


function MovieRecommendation() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch the movie list from Flask backend
    axios.get('https://movie-recommendation-system-miad.onrender.com/movies')  // Adjust URL as needed
      .then(response => setMovies(response.data))
      .catch(error => console.error("Error fetching movie list:", error));
  }, []);


  const recommends = () => {
    axios.post(
      'https://movie-recommendation-system-miad.onrender.com/recommend',
      { searchQuery }, // Send `movie` in the request body
      {
        headers: {
          'Content-Type': 'application/json' 
        }
      }
    )
    .then(response => {setRecommendations(response.data); console.log(response.data)})
    .catch(error => console.error("Error fetching movie recommendations:", error));
  }

  const filteredMovies = movies.filter(movie =>
    movie[1].toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleSelectMovie = (movieName) => {
    setSearchQuery(movieName);
    setShowSuggestions(false); // Hide suggestions once a movie is selected
  };

  return (
    <>
    <div style={{ position: 'relative', width: '300px' }}>
      <label htmlFor="movie-search">Search Movies: </label>
      <input
        type="text"
        id="movie-search"
        placeholder="Type to search..."
        value={searchQuery}
        style={{height : '20px', width  : '300px'}}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSuggestions(true); // Show suggestions as user types
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Hide on blur after a short delay
        onFocus={() => setShowSuggestions(true)} // Show suggestions again on focus
      />

      {/* Display the suggestions list only if there is a search query */}
      {showSuggestions && searchQuery && (
        <div>
          {filteredMovies.map((movie, index) => (
            <div
              key={index}
              onMouseDown={() => handleSelectMovie(movie[1])} // Use onMouseDown to avoid losing focus
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {movie[1]}
            </div>
          ))}
        </div>
      )}
    </div>


    <button onClick={recommends}>Recommed Me</button>
    {recommendations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Recommendations:</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>
                <img src={rec.poster} alt={rec.title} style={{ width: '50px', marginRight: '10px' }} />
                {rec.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MovieRecommendation;
