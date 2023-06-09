import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Flashcard from '../Flashcard';

export default function SingleQuiz() {
    const params = useParams();
    const quizzes = [];
    const topics = useSelector(state => state);
    topics.forEach(tests => tests.quizzes.forEach(test => quizzes.push(test)));
    const quiz = quizzes.find(quiz => quiz.name === params.id);
    
    return (
        <div className='fade'>
            <h1>{params.id}</h1>
            {quiz.data.map(flashcard => <Flashcard front={flashcard.front} back={flashcard.back} />)}
        </div>
    );
}