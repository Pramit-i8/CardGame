import logo from './logo.svg';
import {useState } from 'react';
import './App.css';
import Card from './Card'

// array of card images
const cardImages = [
  { "src": "/images/green2.png"},
  { "src": "/images/blue4.png"},
  { "src": "/images/redrev.png"},
  { "src": "/images/wild.png"},
  { "src": "/images/wilddraw4.png"},
  { "src": "/images/yellowskip.png"},
]

function App() {
  const [cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  
  //cards shuffled 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]      
    //array shuffle  
    .sort(() => Math.random() - 0.5)                        
    .map((card) => ({ ...card, id: Math.random() })) 
    
    setCards(shuffledCards)
    setTurns(0)
  }

  console.log (cards,  turns)
  
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
}

export default App;
Card.js