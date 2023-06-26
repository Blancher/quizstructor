import {useNavigate, useSearchParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import useInput from '../../hooks/useInput';
import Input from '../Input';
import {actions} from '../../store/topicsSlice';

export default function NewTopic() {
    const state = useSelector(state => state);
    const [searchParams] = useSearchParams();
    const editing = searchParams.get('editing');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let name;
    if (editing === 'true') {
        name = searchParams.get('name');
    }
    
    let [input, valid, inputClasses, handleChange, handleBlur, handleSubmit, invalid, message] = useInput(state.map(topic => topic.name), editing === 'true' ? 'special' : 'name', 'Topic', name);
    
    const handleFormSubmit = e => {
        e.preventDefault();
        handleSubmit();

        if (valid) {
            dispatch(editing === 'false' ? actions.addTopic(input) : actions.editTopic({old: name, new: input}));
            message = '';
            navigate('/topics');
        }
    };

    return (
        <div className='fade'>
            <h1>{editing === 'true' ? `Editing ${name}` : 'New Topic'}</h1>
            <form onSubmit={handleFormSubmit}>
                <Input classes={inputClasses} message={message} type='Topic' placeholder='Topic Name' onChange={handleChange} onBlur={handleBlur} invalid={invalid} defaultValue={editing === 'true' ? name.replace('`', ' ') : ''}/>
                <button className='button'>{editing === 'true' ? 'Update' : 'Add'} Topic</button>
            </form>
        </div>
    );
}
