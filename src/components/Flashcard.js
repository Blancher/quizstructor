import {useState} from "react";

export default function Flashcard(props) {
    const [showFront, setShowFront] = useState(true);
    const handleClick = () => setShowFront(prev => !prev);
    
    return (
        <div onClick={handleClick} className='flashcard'>
            {showFront && <p className='fadeAnimation'>{props.front}</p>}
            {!showFront && <p className='fadeAnimation'>{props.back}</p>}
        </div>
    );
}