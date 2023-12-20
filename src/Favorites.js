// Favorites.js

import React, { useState, useEffect } from 'react';

function Favorites() {
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    const storedCities = localStorage.getItem('favoriteCities');

    if (storedCities) {
        console.log(storedCities)
      setFavoriteCities(JSON.parse(storedCities));
    }
  }, []);

  return (
    <div className="favorites">
      <h2>Favorite Cities</h2>
      {favoriteCities.length === 0 ? (
        <p>No favorite cities yet. Add some from the Search page.</p>
      ) : (
        <ul>
          {favoriteCities.map((city, index) => (
            <li key={index}>{city}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
