import {NavLink} from "react-router-dom";

export default function Navbar() {
    return (
        <div id='nav'>
            <h1 id='title'>Quizstructor</h1>
            <nav className='flex'>
                <NavLink to='/' end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Home</NavLink>
                <NavLink to='/topics' end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Topics</NavLink>
                <NavLink to='/topics/new?editing=false' end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>New Topic</NavLink>
                <NavLink to='/quizzes' end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Quizzes</NavLink>
                <NavLink to='/quizzes/new?editing=false' end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>New Quiz</NavLink>
            </nav>
        </div>
    );
}