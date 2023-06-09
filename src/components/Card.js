import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../store/topicsSlice';

export default function Card(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const topics = useSelector(state => state);
    const [deleting, setDeleting] = useState(false);

    const handleRedirect = () => navigate(props.link);
    const handleShowModal = () => setDeleting(true);
    const handleCloseModal = () => setDeleting(false);
    const handleEdit = () => navigate(`/${props.type}/new?editing=true&name=${props.name}`);
    const handleDelete = () => {
        let title;
        if (props.type === 'quizzes') {
            topics.forEach(topic => {
                topic.quizzes.forEach(quiz => {
                    if (quiz.name === props.name) {
                        title = topic.name;
                    }
                });
            });
        }

        dispatch(props.type === 'topics' ? actions.deleteTopic(props.name) : actions.deleteQuiz({topic: title, quiz: props.name}));
        handleCloseModal();
    };
    
    return (
        <>
            <div className='card' onClick={handleRedirect}>
                <p className='text'><b>{props.name}</b></p>
                <p className='text'>{props.text}</p>
            </div>
            <div>
                <button className='change' onClick={handleShowModal}>Delete</button>
                <button className='change' onClick={handleEdit}>Edit</button>
            </div>
            <CSSTransition in={deleting} mountOnEnter unmountOnExit classNames='bg-fade' timeout={250}>
                <div id='transparent'></div>
            </CSSTransition>
            <CSSTransition in={deleting} mountOnEnter unmountOnExit classNames='fade' timeout={250}>
                <div id='modal'>
                    <h2>Are you sure you want to delete <i>{props.name}</i>?</h2>
                    <div className='flex' id='buttons'>
                        <button className='change' onClick={handleDelete}>Yes</button>
                        <button className='change' onClick={handleCloseModal}>No</button>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}