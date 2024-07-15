import React, { useState, useEffect } from 'react';
import './MemoryGame.css'; // Import the CSS file for additional styling
import { Link } from 'react-router-dom';
import service from '../Appwrite/service';
import { useSelector, useDispatch } from 'react-redux';
import { Flag } from 'appwrite';
// import { useSelector } from 'react-redux';

const emojiPairs = ['😀', '🎉', '🍕', '🐱', '🚀', '🌟', '🌈', '⚽', '🍔', '🎄', '🐶', '🏀', '🍦', '🚲', '💡'];
const generateShuffledCards = () => {
  const selectedEmojis = emojiPairs.sort(() => 0.5 - Math.random()).slice(0, 8);
  const cards = [...selectedEmojis, ...selectedEmojis].map((emoji, index) => ({
    id: index,
    emoji,
    matched: false,
  }));
  return cards.sort(() => Math.random() - 0.5);
};

const Services = () => {
  const [cards, setCards] = useState(generateShuffledCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [steps, setSteps] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [showRules, setShowRules] = useState(false);
  let userData = useSelector((state) => state.auth.userData)
  const [displayscore, setdisplayscore] = useState(false);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false)
  const updatePlayerRating = (newScore) => {
    // Logic to update the player's rating in your database or state
    // For example, using a context or API call to save the new score
    if (displayscore)
      return;

    let rate = userData.rating;
    rate = rate + newScore;
    let lev;
    if (rate <= 700)
      lev = "Basic"
    else if (rate <= 1200)
      lev = "Intermediate"
    else
      lev = "Advanced"
    setloading(true);
    service.updateProfile(userData.$id, { ...userData, rating: rate, level: lev })
      .then((x) => {
        console.log(x);
        dispatch(updatePlayerRating(x));
        setdisplayscore(true)
        setMatchedPairs(0);
        setloading(false)
      })
      .catch((err) => {
        console.log(err);
        setloading(false)
      })
    console.log(`Updating player rating with score: ${newScore}`);
    // Add your database or state update logic here
    // handleReplay();
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setSteps(steps + 1);
      const [first, second] = selectedCards;
      if (first.emoji === second.emoji) {
        setMatchedPairs(matchedPairs + 1);
        setCards(prevCards =>
          prevCards.map(card =>
            card.emoji === first.emoji ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => setSelectedCards([]), 1000);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (matchedPairs === 8) {
      {
        calculateScore();
      }
    }
  }, [matchedPairs]);
  const calculateScore = async () => {
    let newScore;
    if (steps <= 15) {
      newScore = 40;
    } else if (steps <= 20) {
      newScore = 30;
    } else if (steps <= 25) {
      newScore = 20;
    } else {
      newScore = 1;
    }
    setScore(newScore);
    updatePlayerRating(newScore); // Update the player's rating
  };

  const handleCardClick = card => {
    if (
      selectedCards.length < 2 &&
      !selectedCards.includes(card) &&
      !card.matched
    ) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleReplay = () => {
    setCards(generateShuffledCards());
    setSelectedCards([]);
    setSteps(0);
    setMatchedPairs(0);
    setScore(0);
    setdisplayscore(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center p-4">
      <Link to='/home'>
        <button className='text-xl font-semibold text-black bg-white px-2 py-1 rounded-md fixed right-1 top-2 hover:bg-gray-500 hover:text-white duration-100'>Back to home</button>
      </Link>
      <h1 className="text-white text-5xl font-extrabold mb-6 font-sans">Memory Game</h1>
      <p className="text-white text-xl mb-4">Match all pairs with the fewest steps possible!</p>
      <button
        className="text-white text-lg mb-4 underline"
        onClick={() => setShowRules(!showRules)}
      >
        {showRules ? 'Hide Rules' : 'Show Rules'}
      </button>
      {showRules && (
        <div className="text-white text-lg mb-4 bg-gray-700 p-4 rounded-lg">
          <ul>
            <li>1. Click on a card to flip it.</li>
            <li>2. Try to find the matching card.</li>
            <li>3. Match all pairs with the fewest steps possible.</li>
            <li>4. Score: Less than 15 steps = 40 points</li>
            <li>5. Less than 20 steps = 30 points</li>
            <li>6. Less than 25 steps = 20 points</li>
            <li>7. 25 steps or more = 1 point</li>
          </ul>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${selectedCards.includes(card) || card.matched ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front">
                <span className="text-3xl">{card.emoji}</span>
              </div>
              <div className="card-back bg-white"></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-white text-xl mt-8">Steps: {steps}</p>
      {displayscore==true && (
        <div className="text-center mt-4">
          <p className="text-white text-2xl mb-4">Congratulations! You completed the game in {steps} steps.</p>
          <p className="text-white text-2xl mb-4">Your Score: {score}</p>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-700 transition duration-300 ease-in-out text-lg font-semibold"
            onClick={handleReplay}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
