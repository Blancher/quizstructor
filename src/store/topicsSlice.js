import {createSlice} from '@reduxjs/toolkit';

const topicsSlice = createSlice({
    name: 'topics',
    initialState: JSON.parse(localStorage.getItem('state')) || [],
    reducers: {
        addTopic(state, action) {
            return [{name: action.payload, quizzes: []}, ...state];
        },
        addQuiz(state, action) {
            return state.map(item => item.name === action.payload.topic ? {name: action.payload.topic, quizzes: [{name: action.payload.name, data: action.payload.data}, ...item.quizzes]} : item);
        },
        deleteTopic(state, action) {
            return state.filter(item => item.name !== action.payload);
        },
        deleteQuiz(state, action) {
            return state.map(item => item.name === action.payload.topic ? {name: item.name, quizzes: item.quizzes.filter(quiz => quiz.name !== action.payload.quiz)} : item);
        },
        editTopic(state, action) {
            return state.map(item => item.name === action.payload.old ? {...item, name: action.payload.new} : item);
        },
        editQuiz(state, action) {
            return state.map(item => item.name === action.payload.topic ? {name: item.name, quizzes: item.quizzes.map(quiz => quiz.name === action.payload.oldName ? {name: action.payload.newName, data: action.payload.data} : quiz)} : item);
        }
    }
});

export const actions = topicsSlice.actions;

export default topicsSlice;