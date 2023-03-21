import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dogImage, setDogImage] = useState(null);
  const [dogName, setDogName] = useState(null);
  const [seenDogImages, setSeenDogImages] = useState([]);
  const [bannedDogImages, setBannedDogImages] = useState([]);

  const fetchDogImage = async () => {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    const data = response.data;
    setDogImage(data.message);
    setDogName(data.message.split('/')[4]);
    setSeenDogImages([...seenDogImages, { url: data.message, name: data.message.split('/')[4] }]);
  };

  const banDogImage = () => {
    setBannedDogImages([...bannedDogImages, { url: dogImage, name: dogName }]);
  };

  const banSeenDogImage = (url) => {
    const newSeenDogImages = seenDogImages.filter((dog) => dog.url !== url);
    setSeenDogImages(newSeenDogImages);
    setBannedDogImages([...bannedDogImages, seenDogImages.find((dog) => dog.url === url)]);
  };

  return (
    <div className="App">
      <div>
        <h1>Random Dog Picture Generator</h1>
      </div>
        
      <div>
        <button onClick={fetchDogImage}>Get Dog Picture</button>
        <button onClick={banDogImage}>Ban Dog Picture</button>
      </div>

      <div className="picture-container">
        {dogImage ? (
          <>
            <h2>{dogName}</h2>
            <img src={dogImage} alt="random dog" style={{ width: '400px', height: '400px' }}/>
          </>
        ) : (
          <p>Click the button to get a dog picture!</p>
        )}
      </div>

      <div className="seen-dog-images">
        <h2>Seen Dog Pictures:</h2>
        {seenDogImages.map((dog, index) => (
          <div key={index}>
            <h3>{dog.name}</h3>
            <img src={dog.url} alt="seen dog" style={{ width: '400px', height: '400px' }}/>
          </div>
        ))}
      </div>

      <div className="banned-dog-images">
        <h2>Banned Dog Pictures:</h2>
        {bannedDogImages.map((dog, index) => (
          <div key={index}>
            <h3>{dog.name}</h3>
            <img src={dog.url} alt="banned dog" style={{ width: '400px', height: '400px' }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
