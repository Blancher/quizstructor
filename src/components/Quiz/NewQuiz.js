import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import useInput from "../../hooks/useInput";
import Input from "../Input";
import QuizCard from '../QuizCard';
import {actions} from '../../store/topicsSlice';

export default function NewQuiz() {
    const state = useSelector(state => state);
    const [searchParams] = useSearchParams();
    const editing = searchParams.get('editing');
    let quizName;
    let quizData;
    let topic;
    if (editing === 'true') {
        state.forEach(item => {
            item.quizzes.forEach(quiz => {
                if (quiz.name === searchParams.get('name')) {
                    quizName = quiz.name;
                    quizData = quiz.data;
                    topic = item.name;
                }
            });
        });
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const names = [];
    state.forEach(item => item.quizzes.forEach(quiz => names.push(quiz.name)));
    const [nameInput, nameValid, nameInputClasses, handleNameChange, handleNameBlur, handleNameSubmit, nameInvalid, nameMessage] = useInput(names, editing === 'true' ? 'special' : 'name', 'Quiz', quizName);
    const [topicInput, topicValid, topicInputClasses, handleTopicChange, handleTopicBlur, handleTopicSubmit, topicInvalid, topicMessage] = useInput([], 'name', 'Quiz');
    const [cards, setCards] = useState(quizData || [{id: Date.now(), front: '', back: '', valid: false, handleSubmit() {}, reset() {}}]);
    const cardsArray = [];
    cards.forEach(card => {
        cardsArray.push(card.front);
        cardsArray.push(card.back);
    });
    const valid = nameValid && (editing === 'true' ? true : topicValid) && cards.every(card => card.valid) && cards.length > 0;

    const handleAddItem = () => setCards(prev => [...prev, {id: Date.now(), front: '', back: '', valid: false, handleSubmit() {}}]);
    const handleUpdateItem = (id, front, back, valid, handleSubmit) => setCards(prev => prev.map(card => card.id === id ? {id: id, front: front, back: back, valid: valid, handleSubmit: handleSubmit} : card));
    const handleDeleteItem = id => setCards(prev => prev.filter(item => id !== item.id));
    const handleFormSubmit = () => {
        handleNameSubmit();
        handleTopicSubmit();
        cards.forEach(card => card.handleSubmit());
        if (valid && cards.length > 0) {
            dispatch(editing === 'false' ? actions.addQuiz({topic: topicInput, name: nameInput, data: cards}) : actions.editQuiz({topic: topic, oldName: quizName, newName: nameInput, data: cards}));
            navigate('/quizzes');
        }
    };

    return (
        <div className='fade'>
            <h1>{editing === 'true' ? `Editing ${quizName.replace('`', ' ')}` : 'New Topic'}</h1>
            {cards.length === 0 && <p className='topError'>Your quiz needs cards to be created</p>}
            <Input classes={nameInputClasses} message={nameMessage} type='Quiz' placeholder='Quiz Name' value={nameInput} onChange={handleNameChange} onBlur={handleNameBlur} invalid={nameInvalid}/>
            {editing === 'false' && (
                <div className={topicInputClasses}>
                    <CSSTransition in={topicInvalid} mountOnEnter unmountOnExit classNames='fade' timeout={1000}>
                        <p>{topicMessage}</p>
                    </CSSTransition>
                    <select value={topicInput} onChange={handleTopicChange} onBlur={handleTopicBlur}>
                        <option value=''>Topic</option>
                        {state.map((item, i) => (
                            <option key={i} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <TransitionGroup component='div' className='flex'>
                {cards.map(card => (
                    <CSSTransition key={card.id} mountOnEnter unmountOnExit classNames='shrink' timeout={250}>
                        <QuizCard key={card.id} card={card} onUpdate={handleUpdateItem} onDelete={() => handleDeleteItem(card.id)} cardsArray={cardsArray} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <button className='button' onClick={handleAddItem}>Add Card</button>
            <button className='button' onClick={handleFormSubmit}>{editing === 'true' ? 'Update' : 'Add'} Quiz</button>
        </div>
    );
}