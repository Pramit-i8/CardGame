import './SingleCard.css'

export default function SingleCard({card, handleChoice})
{
    const handleClick = () => {
        handleChoice(card)
    }



    return (
        <div className='card'>
            <div>
              <img className='front' src={card.src} alt="card front" /> 
              <img className='back' src="/images/uno.png" onClick={handleClick} alt="card front" />
            </div>
        </div> 
    )
}