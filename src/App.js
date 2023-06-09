import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from './components/Root';
import Error from './components/Error';
import Home from './components/Home';
import Topics from './components/Topic/Topics';
import NewTopic from './components/Topic/NewTopic';
import SingleTopic from './components/Topic/SingleTopic';
import Quizzes from './components/Quiz/Quizzes';
import NewQuiz from './components/Quiz/NewQuiz';
import SingleQuiz from './components/Quiz/SingleQuiz';

const router = createBrowserRouter([
  {path: '/', element: <Root/>, errorElement: <Error/>, children: [
    {index: true, element: <Home/>},
    {path: '/topics', children: [
      {index: true, element: <Topics/>},
      {path: '/topics/new', element: <NewTopic/>},
      {path: '/topics/:id', element: <SingleTopic/>}
    ]},
    {path: '/quizzes', children: [
      {index: true, element: <Quizzes/>},
      {path: '/quizzes/new', element: <NewQuiz/>},
      {path: '/quizzes/:id', element: <SingleQuiz/>}
    ]}
  ]}
]);

export default function App() {
  const state = useSelector(state => state);
  useEffect(() => localStorage.setItem('state', JSON.stringify(state)), [state]);

  return <RouterProvider router={router}/>;
}