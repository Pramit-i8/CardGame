import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// array of card images
//  3 by 4 grid: 12 cards, 6 pairs
const cardImages = [
  { "src": "/images/2.png", matched: false },
  { "src": "/images/card-blue4.png", matched: false },
  { "src": "/images/redrev.png", matched: false },
  { "src": "/images/wild.png", matched: false },
  { "src": "/images/wilddraw4.png", matched: false },
  { "src": "/images/yellowskip.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards algorithm
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]      
      .sort(() => Math.random() - 0.5)                        
      .map((card) => ({ ...card, id: Math.random() }))        

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  //user choice, update choices 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)        
  }

  // restart game to new grid 
  useEffect(() => {
    shuffleCards()
  }, [])

  // compare between the two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } 
      else 
      {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increase number of turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <h5>Select two cards of same value</h5>
      <button onClick={shuffleCards}>New Game</button>
      <p>Moves: {turns}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
