import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Card from '../Card';

export default function Quizzes() {
    const quizzes = [];
    const topics = useSelector(state => state);
    topics.forEach(tests => tests.quizzes.forEach(test => quizzes.push(test)));

    return (
        <div className='fade'>
            <h1>Quizzes</h1>
            {topics.length === 0 && <p className='text'>No quizzes have been created.</p>}
            {topics.length > 0 && (
                <TransitionGroup compenent='div' id='cards' className='flex'>
                    {quizzes.map((quiz, i) => (
                        <CSSTransition key={i} mountOnEnter unmountOnExit classNames='card-shrink' timeout={250}>
                            <Card name={quiz.name} text={`${quiz.data.length} Card${quiz.data.length !== 1 ? 's' : ''}`} link={`/quizzes/${quiz.name}`} type='quizzes'/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
            <Link to='/quizzes/new?editing=false' className='button'>Create New Quiz</Link>
        </div>
    );
}