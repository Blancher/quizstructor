import {useEffect} from "react";
import useInput from "../hooks/useInput";
import Input from "./Input";

export default function QuizCard(props) {
    const [frontInput, frontValid, frontInputClasses, handleFrontChange, handleFrontBlur, handleFrontSubmit, frontInvalid, frontMessage] = useInput(props.cardsArray, 'card', 'Card name', props.card.front);
    const [backInput, backValid, backInputClasses, handleBackChange, handleBackBlur, handleBackSubmit, backInvalid, backMessage] = useInput(props.cardsArray, 'card', 'Card name', props.card.back);
    
    useEffect(() => {
        const valid = frontValid && backValid;
        const handleSubmit = () => {
            handleFrontSubmit();
            handleBackSubmit();
        };

        props.onUpdate(props.card.id, frontInput, backInput, valid, handleSubmit);
    }, [frontInput, backInput]);

    return (
        <div className='quizCard'>
            <Input classes={frontInputClasses} invalid={frontInvalid} message={frontMessage} placeholder='Front Card' value={frontInput} onChange={handleFrontChange} onBlur={handleFrontBlur}/>
            <Input classes={backInputClasses} invalid={backInvalid} message={backMessage} placeholder='Front Card' value={backInput} onChange={handleBackChange} onBlur={handleBackBlur}/>
            <button className='button' onClick={props.onDelete}>Remove Card</button>
        </div>
    );
}