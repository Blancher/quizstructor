import {useSelector} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import Card from '../Card';

export default function SingleTopic() {
    const params = useParams();
    const topics = useSelector(state => state);
    const topic = topics.find(topic => topic.name === params.id).quizzes;
    
    return (
        <div className='fade'>
            <h1>{params.id} - Quizzes</h1>
            {topic.length === 0 && <Link to='/quizzes/new?editing=false' className='button'>Create New Quiz</Link>}
            {topics.length > 0 && (
                <div id='cards' className='flex'>
                    {topic.map(quiz => <Card name={quiz.name} text={`${quiz.data.length} Card${quiz.data.length !== 1 ? 's' : ''}`} link={`/quizzes/${quiz.name}`} type='quizzes'/>)}
                </div>
            )}
        </div>
    );
}