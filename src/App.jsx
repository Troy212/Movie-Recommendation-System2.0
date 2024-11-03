import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieRecommendation from './components/MovieRecommendation';

function App() {
  return (
    <div>
      <h1>Movie Recommendation System</h1>
      <MovieRecommendation />
    </div>
  );
}

export default App;
