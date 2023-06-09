import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Card from '../Card';

export default function Topics() {
    const topics = useSelector(state => state);

    return (
        <div className='fade'>
            <h1>Topics</h1>
            {topics.length === 0 && <p className='text'>No topics have been created.</p>}
            {topics.length > 0 && (
                <TransitionGroup component='div' id='cards' className='flex'>
                    {topics.map((topic, i) => (
                        <CSSTransition key={i} mountOnEnter unmountOnExit classNames='card-shrink' timeout={250}>
                            <Card key={i} name={topic.name} text={`${topic.quizzes.length} Quiz${topic.quizzes.length !== 1 ? 'zes' : ''}`} link={`/topics/${topic.name}`} type='topics'/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
            <Link to='/topics/new?editing=false' className='button'>Create New Topic</Link>
        </div>
    );
}