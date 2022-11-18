import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// array of card images
const cardImages = [
  { "src": "/images/green2.png", matched: false },
  { "src": "/images/blue4.png", matched: false },
  { "src": "/images/redrev.png", matched: false },
  { "src": "/images/wild.png", matched: false },
  { "src": "/images/wilddraw4.png", matched: false },
  { "src": "/images/yellowskip.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  
  //cards shuffled 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]      
    //array shuffle  
    .sort(() => Math.random() - 0.5)                        
    .map((card) => ({ ...card, id: Math.random() })) 
    
    setCards(shuffledCards)
    setTurns(0)
  }

  //handling choices
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)  
  }
  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }
            else
            {
              return card
            }
          
          })
        })
        resetTurn()
      }
      else
      {
        setTimeout(() => resetTurn(),1000)
      }
    }
  },[choiceOne, choiceTwo])
  
  // reset choices and increase number of turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} fliped={card === choiceOne || card === choiceTwo || card.matched}/>
           
        ))}  
      </div>
    </div>
  );
}

export default App;
