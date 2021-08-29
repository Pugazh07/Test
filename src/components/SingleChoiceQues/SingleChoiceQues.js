import React,{useState} from 'react';
import { useDispatch } from 'react-redux';

import * as actionTypes from '../../store/actions'
import './SingleChoiceQues.css'

const SingleChoiceQues =(props) =>{
    // console.log('[SingleChoiceQues.js]', props.question)
    const dispatch=useDispatch();
    const updateAnswers=(question_id, answer_id, provided_answer) =>dispatch({
        type: actionTypes.UPDATEANSWERS,
        question_id: question_id,
        answer_id: answer_id,
        provided_answer: provided_answer
    })
    const [selectedOption, setSelectedOption]=useState(()=>{
        return sessionStorage.getItem(props.question.id) ? JSON.parse(sessionStorage.getItem(props.question.id)) : null;
    })

    const optionSelectHandler = (e,id, answer) =>{
        console.log(e.target)
        sessionStorage.setItem(props.question.id, JSON.stringify(id))
        setSelectedOption(id)
        updateAnswers(props.question.id, id, answer)
    }

    return<div className='SingleChoiceQues'>
        <div dangerouslySetInnerHTML={{__html: props.question.content}}/>
        {props.question.choices.map(choice=>{
            // console.log(choice.id , selectedOption)
            return <div key={choice.id}>
            <input type='radio' value={choice.content} checked={choice.id === selectedOption} onChange={(e)=>{optionSelectHandler(e,choice.id, choice.content)}}/>
            <span className='Radio' key={choice.id} dangerouslySetInnerHTML={{__html: choice.content}}/>
            </div>
        })}
    </div>
}

export default SingleChoiceQues;